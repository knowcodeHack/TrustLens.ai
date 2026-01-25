"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Download, 
  ChevronRight,
  Calendar as CalendarIcon,
  Info,
  X,
  Check,
  FileJson,
  FileSpreadsheet,
  Loader2
} from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useSession } from "next-auth/react";

interface Log {
  id: string;
  event_type: string;
  user_id: string | null;
  ip: string | null;
  location: string | null;
  timestamp: string;
  severity: string | null;
  resource: string | null;
  metadata: any;
  anomaly_score: number | null;
}

const severityOptions = ["info", "warn", "error", "low", "medium", "high"];
const timeRangeOptions = [
  { label: "Last 1 Hour", value: "1h" },
  { label: "Last 24 Hours", value: "24h" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "All Time", value: "all" },
];

export default function LogsExplorerPage() {
  const { data: session } = useSession();
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventTypes, setEventTypes] = useState<string[]>([]);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeverities, setSelectedSeverities] = useState<string[]>([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState("24h");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [userOrgId, setUserOrgId] = useState<string | null>(null);

  // Fetch user's org_id from session
  useEffect(() => {
    if (session?.user) {
      const orgId = (session.user as any).org_id;
      setUserOrgId(orgId);
    }
  }, [session]);

  // Fetch logs from Supabase
  useEffect(() => {
    async function fetchLogs() {
      // Wait for user org_id to be available
      if (!userOrgId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        let query = supabase
          .from('logs')
          .select('*')
          .eq('org_id', userOrgId) // Filter by organization
          .order('timestamp', { ascending: false });

        // Apply time range filter
        if (timeRange !== 'all') {
          const now = new Date();
          let startDate = new Date();
          
          switch (timeRange) {
            case '1h':
              startDate.setHours(now.getHours() - 1);
              break;
            case '24h':
              startDate.setHours(now.getHours() - 24);
              break;
            case '7d':
              startDate.setDate(now.getDate() - 7);
              break;
            case '30d':
              startDate.setDate(now.getDate() - 30);
              break;
          }
          
          query = query.gte('timestamp', startDate.toISOString());
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching logs:', error);
          toast.error('Failed to fetch logs');
          return;
        }

        setLogs(data || []);
        
        // Extract unique event types
        const uniqueEventTypes = Array.from(new Set(data?.map(log => log.event_type) || []));
        setEventTypes(uniqueEventTypes);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to fetch logs');
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, [timeRange, userOrgId]); // Re-fetch when time range or org_id changes

  // Filter logs based on search and filters
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === "" || 
        log.event_type?.toLowerCase().includes(searchLower) ||
        log.user_id?.toLowerCase().includes(searchLower) ||
        log.ip?.includes(searchQuery) ||
        log.location?.toLowerCase().includes(searchLower);

      // Severity filter
      const matchesSeverity = selectedSeverities.length === 0 || 
        (log.severity && selectedSeverities.includes(log.severity));

      // Event type filter
      const matchesEventType = selectedEventTypes.length === 0 || 
        selectedEventTypes.includes(log.event_type);

      return matchesSearch && matchesSeverity && matchesEventType;
    });
  }, [logs, searchQuery, selectedSeverities, selectedEventTypes]);

  const activeFilterCount = selectedSeverities.length + selectedEventTypes.length;

  const toggleSeverity = (severity: string) => {
    setSelectedSeverities(prev => 
      prev.includes(severity) 
        ? prev.filter(s => s !== severity)
        : [...prev, severity]
    );
  };

  const toggleEventType = (eventType: string) => {
    setSelectedEventTypes(prev => 
      prev.includes(eventType) 
        ? prev.filter(e => e !== eventType)
        : [...prev, eventType]
    );
  };

  const clearAllFilters = () => {
    setSelectedSeverities([]);
    setSelectedEventTypes([]);
    setSearchQuery("");
    toast.success("All filters cleared");
  };

  const exportLogs = (format: "json" | "csv") => {
    const logsToExport = filteredLogs.map(log => ({
      id: log.id,
      eventType: log.event_type,
      userId: log.user_id,
      ip: log.ip,
      location: log.location,
      timestamp: log.timestamp,
      severity: log.severity,
      resource: log.resource,
      anomalyScore: log.anomaly_score,
    }));

    let content: string;
    let filename: string;
    let mimeType: string;

    if (format === "json") {
      content = JSON.stringify(logsToExport, null, 2);
      filename = `trustlens-logs-${new Date().toISOString().split('T')[0]}.json`;
      mimeType = "application/json";
    } else {
      // CSV format
      const headers = ["ID", "Event Type", "User ID", "IP Address", "Location", "Timestamp", "Severity", "Resource", "Anomaly Score"];
      const rows = logsToExport.map(log => [
        log.id,
        log.eventType,
        log.userId || '',
        log.ip || '',
        log.location || '',
        log.timestamp,
        log.severity || '',
        log.resource || '',
        log.anomalyScore || '0'
      ]);
      content = [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
      filename = `trustlens-logs-${new Date().toISOString().split('T')[0]}.csv`;
      mimeType = "text/csv";
    }

    // Create and download file
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`Exported ${filteredLogs.length} logs as ${format.toUpperCase()}`);
  };

  const getTimeRangeLabel = () => {
    return timeRangeOptions.find(t => t.value === timeRange)?.label || "Last 24 Hours";
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Logs Explorer</h1>
          <p className="text-zinc-500">Search and analyze all ingested logs.</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-white/10 hover:bg-white/5" disabled={loading}>
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-zinc-900 border-white/10">
            <DropdownMenuLabel className="text-zinc-400">Export Format</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-white/5"
              onClick={() => exportLogs("json")}
            >
              <FileJson className="w-4 h-4 mr-2 text-blue-500" />
              Export as JSON
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-white/5"
              onClick={() => exportLogs("csv")}
            >
              <FileSpreadsheet className="w-4 h-4 mr-2 text-green-500" />
              Export as CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-zinc-500">Active filters:</span>
          {selectedSeverities.map(severity => (
            <Badge 
              key={severity} 
              variant="outline" 
              className="border-white/10 cursor-pointer hover:bg-white/10"
              onClick={() => toggleSeverity(severity)}
            >
              {severity}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
          {selectedEventTypes.map(eventType => (
            <Badge 
              key={eventType} 
              variant="outline" 
              className="border-white/10 cursor-pointer hover:bg-white/10"
              onClick={() => toggleEventType(eventType)}
            >
              {eventType}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-zinc-400 hover:text-white"
            onClick={clearAllFilters}
          >
            Clear all
          </Button>
        </div>
      )}

      <Card className="bg-zinc-900 border-white/10">
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input 
                placeholder="Filter by user, IP, or event type..." 
                className="pl-10 bg-black border-white/5" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 hover:bg-white/10"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              {/* Time Range Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-white/5 bg-black hover:bg-white/5">
                    <CalendarIcon className="w-4 h-4 mr-2 text-zinc-500" />
                    {getTimeRangeLabel()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-zinc-900 border-white/10">
                  {timeRangeOptions.map(option => (
                    <DropdownMenuItem 
                      key={option.value}
                      className="cursor-pointer hover:bg-white/5"
                      onClick={() => {
                        setTimeRange(option.value);
                        toast.success(`Time range set to ${option.label}`);
                      }}
                    >
                      {timeRange === option.value && <Check className="w-4 h-4 mr-2 text-blue-500" />}
                      {timeRange !== option.value && <span className="w-4 h-4 mr-2" />}
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Filters Popover */}
              <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="border-white/5 bg-black hover:bg-white/5 relative">
                    <Filter className="w-4 h-4 mr-2 text-zinc-500" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full text-xs flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 bg-zinc-900 border-white/10 p-0" align="end">
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-white">Filters</h4>
                      {activeFilterCount > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-zinc-400 hover:text-white h-auto py-1"
                          onClick={clearAllFilters}
                        >
                          Clear all
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Severity Filter */}
                  <div className="p-4 border-b border-white/10">
                    <p className="text-xs font-semibold text-zinc-500 uppercase mb-3">Severity</p>
                    <div className="flex flex-wrap gap-2">
                      {severityOptions.map(severity => (
                        <Button
                          key={severity}
                          variant="outline"
                          size="sm"
                          className={`border-white/10 ${
                            selectedSeverities.includes(severity) 
                              ? 'bg-blue-600 border-blue-600 hover:bg-blue-700' 
                              : 'hover:bg-white/5'
                          }`}
                          onClick={() => toggleSeverity(severity)}
                        >
                          {selectedSeverities.includes(severity) && <Check className="w-3 h-3 mr-1" />}
                          {severity}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Event Type Filter */}
                  <div className="p-4">
                    <p className="text-xs font-semibold text-zinc-500 uppercase mb-3">Event Type</p>
                    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                      {eventTypes.map(eventType => (
                        <Button
                          key={eventType}
                          variant="outline"
                          size="sm"
                          className={`border-white/10 text-xs ${
                            selectedEventTypes.includes(eventType) 
                              ? 'bg-blue-600 border-blue-600 hover:bg-blue-700' 
                              : 'hover:bg-white/5'
                          }`}
                          onClick={() => toggleEventType(eventType)}
                        >
                          {selectedEventTypes.includes(eventType) && <Check className="w-3 h-3 mr-1" />}
                          {eventType}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border-t border-white/10">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Apply Filters ({filteredLogs.length} results)
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Results count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-zinc-500">
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading logs...
                </span>
              ) : (
                <>
                  Showing <span className="text-white font-medium">{filteredLogs.length}</span> of {logs.length} logs
                </>
              )}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  <th className="pb-4 px-4">Timestamp</th>
                  <th className="pb-4 px-4">Event Type</th>
                  <th className="pb-4 px-4">User</th>
                  <th className="pb-4 px-4">IP Address</th>
                  <th className="pb-4 px-4 text-right">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {!session ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-500" />
                      <p className="text-zinc-500 mt-2">Authenticating...</p>
                    </td>
                  </tr>
                ) : !userOrgId ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                      <Info className="w-12 h-12 mx-auto text-zinc-600 mb-2" />
                      <p className="text-zinc-500">No organization found</p>
                      <p className="text-zinc-600 text-sm mt-1">Please contact your administrator</p>
                    </td>
                  </tr>
                ) : loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-500" />
                      <p className="text-zinc-500 mt-2">Loading logs...</p>
                    </td>
                  </tr>
                ) : filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                      <p className="text-zinc-500">No logs match your filters</p>
                      <Button 
                        variant="link" 
                        className="text-blue-500 mt-2"
                        onClick={clearAllFilters}
                      >
                        Clear all filters
                      </Button>
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <Drawer key={log.id}>
                      <DrawerTrigger asChild>
                        <tr 
                          className="group hover:bg-white/[0.02] cursor-pointer transition-colors"
                          onClick={() => setSelectedLog(log)}
                        >
                          <td className="py-4 px-4 text-sm text-zinc-400 font-mono">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                          <td className="py-4 px-4 text-sm font-medium text-white">{log.event_type}</td>
                          <td className="py-4 px-4 text-sm text-zinc-400">{log.user_id || 'N/A'}</td>
                          <td className="py-4 px-4 text-sm text-zinc-400 font-mono">
                            {log.ip || 'N/A'} {log.location && <span className="text-[10px] text-zinc-600 ml-1">({log.location})</span>}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <Badge className={
                              log.severity === 'error' || log.severity === 'high' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                              log.severity === 'warn' || log.severity === 'medium' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                              'bg-blue-500/10 text-blue-500 border-blue-500/20'
                            }>
                              {log.severity || 'low'}
                            </Badge>
                          </td>
                        </tr>
                      </DrawerTrigger>
                      <DrawerContent className="bg-zinc-950 border-white/10 text-white max-h-[85vh]">
                        <div className="mx-auto w-full max-w-2xl">
                          <DrawerHeader>
                            <DrawerTitle>Log Details</DrawerTitle>
                            <DrawerDescription className="text-zinc-500">Raw event data and metadata.</DrawerDescription>
                          </DrawerHeader>
                          <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                                <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Event Type</p>
                                <p className="text-sm font-medium">{log.event_type}</p>
                              </div>
                              <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                                <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Severity</p>
                                <p className="text-sm font-medium capitalize">{log.severity || 'low'}</p>
                              </div>
                              <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                                <p className="text-xs text-zinc-500 uppercase font-bold mb-1">User</p>
                                <p className="text-sm font-medium">{log.user_id || 'N/A'}</p>
                              </div>
                              <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                                <p className="text-xs text-zinc-500 uppercase font-bold mb-1">IP Address</p>
                                <p className="text-sm font-medium font-mono">{log.ip || 'N/A'}</p>
                              </div>
                              <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                                <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Location</p>
                                <p className="text-sm font-medium">{log.location || 'N/A'}</p>
                              </div>
                              <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                                <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Anomaly Score</p>
                                <p className="text-sm font-medium">{log.anomaly_score?.toFixed(2) || '0.00'}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <p className="text-xs text-zinc-500 uppercase font-bold">Raw JSON</p>
                              <pre className="p-4 rounded-lg bg-black border border-white/5 text-xs text-blue-400 overflow-x-auto">
{JSON.stringify({
  id: log.id,
  eventType: log.event_type,
  userId: log.user_id,
  ip: log.ip,
  location: log.location,
  timestamp: log.timestamp,
  severity: log.severity,
  resource: log.resource,
  anomalyScore: log.anomaly_score,
  metadata: log.metadata
}, null, 2)}
                              </pre>
                            </div>
                          </div>
                          <DrawerFooter>
                            <DrawerClose asChild>
                              <Button variant="outline" className="border-white/10 hover:bg-white/5">Close</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
