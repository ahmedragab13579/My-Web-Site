import { useState, type JSX } from "react";
import { useContactMessages } from "../../BackEndIntegration/Hooks/Queries/useContactQueries";
import { useReplyToMessage } from "../../BackEndIntegration/Hooks/Mutations/useContactMutations";
import { Eye, Reply, X, Loader2, Calendar, Mail, User, BookOpen } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminMessages(): JSX.Element {
  const [page, setPage] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  // Fetch messages from inbox
  const { data: pagedResult, isLoading, refetch } = useContactMessages(page, 10);

  const messages = pagedResult?.items || [];
  const totalPages = pagedResult?.totalPages || 1;

  // Reply mutation
  const sendReply = useReplyToMessage();

  const handleOpenDetailModal = (message: any) => {
    setSelectedMessage(message);
    setReplyContent("");
    setIsModalOpen(true);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMessage) return;

    sendReply.mutate(
      { id: selectedMessage.id, request: { replyContent } },
      {
        onSuccess: () => {
          toast.success("Reply recorded successfully!");
          setIsModalOpen(false);
          refetch();
        },
        onError: () => {
          toast.error("Failed to send reply.");
        },
      }
    );
  };

  const getStatusClass = (msg: any) => {
    if (msg.isReplied) {
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/20";
    }
    if (msg.isRead) {
      return "bg-blue-500/20 text-blue-400 border-blue-500/20";
    }
    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/20 animate-pulse";
  };

  const getStatusText = (msg: any) => {
    if (msg.isReplied) return "Replied";
    if (msg.isRead) return "Read";
    return "New Message";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-brand-cream">Messages Inbox</h1>
        <p className="text-brand-cream/60">View and respond to inquiries submitted through the contact form.</p>
      </div>

      {/* Messages Table */}
      {isLoading ? (
        <div className="flex h-40 items-center justify-center text-brand-teal">
          <Loader2 className="animate-spin mr-2" size={24} />
          <span>Loading messages...</span>
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-brand-teal/20 rounded-2xl bg-brand-blue/5">
          <p className="text-brand-cream/60 text-lg">No messages received yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-brand-teal/20 rounded-xl bg-brand-blue/5 backdrop-blur-sm shadow-brand-sm">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-brand-teal/20 bg-slate-900/50 text-brand-teal font-semibold">
                <th className="p-4">Sender</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="border-b border-brand-teal/10 hover:bg-brand-blue/10 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-brand-cream">{msg.senderName}</div>
                    <div className="text-xs text-brand-cream/50">{msg.senderEmail}</div>
                  </td>
                  <td className="p-4 text-brand-cream/80 max-w-xs truncate">{msg.subject}</td>
                  <td className="p-4 text-brand-cream/60">{new Date(msg.sentAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-2xs font-semibold border ${getStatusClass(msg)}`}>
                      {getStatusText(msg)}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleOpenDetailModal(msg)}
                      className="p-2 bg-brand-teal/10 hover:bg-brand-teal/20 text-brand-teal rounded border border-brand-teal/20 transition-colors cursor-pointer inline-flex items-center gap-1 text-xs font-semibold"
                    >
                      <Eye size={14} />
                      Read
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 border border-brand-teal/30 hover:border-brand-teal bg-brand-blue/20 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Previous
          </button>
          <span className="text-brand-cream/80 text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="px-4 py-2 border border-brand-teal/30 hover:border-brand-teal bg-brand-blue/20 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Next
          </button>
        </div>
      )}

      {/* Message View / Reply Modal */}
      {isModalOpen && selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[var(--card-bg)] border border-brand-teal/20 rounded-2xl w-full max-w-xl p-8 shadow-brand relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-brand-cream/60 hover:text-brand-teal cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-brand-teal mb-6">Read Message</h2>

            <div className="space-y-6">
              {/* Message Details */}
              <div className="border border-brand-teal/10 bg-[var(--bg-main)]/45 p-6 rounded-xl space-y-4">
                <div className="grid gap-3 sm:grid-cols-2 text-sm text-brand-cream/70">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-brand-teal" />
                    <span className="font-semibold text-brand-cream">{selectedMessage.senderName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-brand-teal" />
                    <span className="truncate">{selectedMessage.senderEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-brand-teal" />
                    <span className="font-semibold text-brand-cream">{selectedMessage.subject}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-brand-teal" />
                    <span>{new Date(selectedMessage.sentAt).toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-brand-teal/10 pt-4 mt-4">
                  <p className="text-xs text-brand-teal mb-2 font-semibold uppercase tracking-wider">Message Content</p>
                  <p className="text-sm text-brand-cream/80 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.content}
                  </p>
                </div>
              </div>

              {/* Reply Section */}
              <form onSubmit={handleSendReply} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Write a Response</label>
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    required
                    rows={4}
                    placeholder="Type your response email content here..."
                    className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none placeholder-brand-cream/30 text-sm"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-brand-teal/10">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 border border-brand-teal/30 rounded-lg text-sm text-brand-cream hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={sendReply.isPending}
                    className="btn-primary text-sm font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Reply size={16} />
                    {sendReply.isPending ? "Sending..." : "Send Response"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
