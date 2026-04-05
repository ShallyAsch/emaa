'use client';

import React, { useState, useEffect } from 'react';
import { Check, Clock, Package, RefreshCw } from 'lucide-react';

interface ServiceRequest {
  id: number;
  clerk_id: string;
  request_type: string;
  status: string;
  created_at: string;
  first_name: string | null;
  email: string | null;
}

export default function StaffTab() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'fulfilled'>('all');

  const fetchRequests = () => {
    fetch('/api/staff')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setRequests(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchRequests(); }, []);

  const fulfillRequest = (id: number) => {
    fetch('/api/staff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
      .then(() => fetchRequests())
      .catch(() => {});
  };

  const filtered = requests.filter(r => filter === 'all' || r.status === filter);
  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const fulfilledCount = requests.filter(r => r.status === 'fulfilled').length;

  const typeIcons: Record<string, string> = {
    'Extra Pillows': '🛏️',
    'More Towels': '🧴',
    'Quiet Room': '🔇',
    'Extra Blankets': '❄️',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-muted-foreground">Loading requests...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 md:px-6 py-8 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#4B3425]">Service Requests</h1>
            <p className="text-muted-foreground mt-1">Manage guest requests in real-time</p>
          </div>
          <button onClick={fetchRequests} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <RefreshCw className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
            <div className="text-2xl font-bold text-[#4B3425]">{requests.length}</div>
            <div className="text-sm text-muted-foreground">Total Requests</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-green-200">
            <div className="text-2xl font-bold text-green-600">{fulfilledCount}</div>
            <div className="text-sm text-muted-foreground">Fulfilled</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {(['all', 'pending', 'fulfilled'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-[#D4A017] text-white'
                  : 'bg-white text-foreground hover:bg-muted border border-border'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Requests List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No requests to show</p>
            </div>
          ) : (
            filtered.map(req => (
              <div key={req.id} className={`bg-white rounded-xl p-5 shadow-sm border transition-colors ${req.status === 'fulfilled' ? 'border-green-200 bg-green-50/30' : 'border-border'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{typeIcons[req.request_type] || '📋'}</div>
                    <div>
                      <h3 className="font-semibold text-foreground">{req.request_type}</h3>
                      <p className="text-sm text-muted-foreground">
                        {req.first_name || 'Guest'} · {new Date(req.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {req.status === 'fulfilled' ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                        <Check className="w-4 h-4" /> Done
                      </span>
                    ) : (
                      <>
                        <span className="flex items-center gap-1 text-yellow-600 text-sm font-medium">
                          <Clock className="w-4 h-4" /> Pending
                        </span>
                        <button
                          onClick={() => fulfillRequest(req.id)}
                          className="bg-[#D4A017] hover:bg-[#D4A017]/90 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                        >
                          Mark Done
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
