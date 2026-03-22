import { useQuery } from "@tanstack/react-query";
import type { ContactSubmission } from "../backend";
import { useActor } from "../hooks/useActor";

function formatTimestamp(ts: bigint): string {
  // Motoko Time.now() returns nanoseconds
  const ms = Number(ts / 1_000_000n);
  if (ms <= 0) return "—";
  return new Date(ms).toLocaleString();
}

export function AdminScreen() {
  const { actor, isFetching: actorLoading } = useActor();

  const { data, isLoading, error, refetch } = useQuery<ContactSubmission[]>({
    queryKey: ["admin", "contactSubmissions"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.getAllContactSubmissions();
      return result;
    },
    enabled: !!actor && !actorLoading,
    retry: 2,
    retryDelay: 1000,
  });

  const loading = actorLoading || isLoading;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Admin — Contact Submissions
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            All messages submitted via the Contact form.
          </p>
        </div>

        {loading && (
          <div className="text-gray-500 text-sm">Loading submissions...</div>
        )}

        {!loading && error && (
          <div className="space-y-2">
            <div className="text-red-600 text-sm">
              Failed to load submissions: {(error as Error).message}
            </div>
            <button
              type="button"
              onClick={() => refetch()}
              className="text-sm px-3 py-1.5 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && data && data.length === 0 && (
          <div className="text-gray-500 text-sm">No submissions yet.</div>
        )}

        {!loading && !error && data && data.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email / Phone</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3 whitespace-nowrap">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.map((sub, idx) => (
                  <tr
                    key={`${sub.name}-${String(sub.timestamp)}-${idx}`}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                      {sub.name}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {sub.emailOrPhone}
                    </td>
                    <td className="px-4 py-3 text-gray-700 max-w-xs break-words">
                      {sub.message}
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {formatTimestamp(sub.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
