import React, { useEffect, useRef } from 'react';
import {
  CheckCircle2,
  XCircle,
  Info,
  AlertTriangle,
  X,
} from 'lucide-react';

// ─── Icon map ──────────────────────────────────────────────────────────────────
const ICONS = {
  success: <CheckCircle2 size={18} />,
  error:   <XCircle      size={18} />,
  info:    <Info         size={18} />,
  warning: <AlertTriangle size={18} />,
};

// ─── Single Toast ──────────────────────────────────────────────────────────────
function ToastItem({ toast, dismiss }) {
  const { id, message, text, type = 'info' } = toast;
  const content = message || text;
  const elRef = useRef(null);

  // Trigger the fade-up animation on mount
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    // Force a reflow so the 'entering' class starts from opacity 0 / translateY
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.classList.add('toast--visible');
      });
    });
  }, []);

  const typeClass = `toast-${type}`;

  return (
    <div
      ref={elRef}
      className={`toast ${typeClass}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {/* Icon */}
      <span className="toast__icon" aria-hidden="true">
        {ICONS[type] ?? ICONS.info}
      </span>

      {/* Message */}
      <span className="toast__message">{content}</span>

      {/* Dismiss button */}
      <button
        className="toast__dismiss btn btn-ghost"
        onClick={() => dismiss(id)}
        aria-label="Dismiss notification"
        title="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}

// ─── Toast Container ───────────────────────────────────────────────────────────
/**
 * Toast notification system.
 *
 * Props:
 *   toasts  – array of { id, message, type }
 *   dismiss – (id) => void  called when user dismisses or auto-dismiss fires
 *
 * Auto-dismiss is handled by the parent (via useToast or similar hook).
 * This component only renders the stack and wires up manual dismissal.
 */
export default function Toast({ toasts = [], dismiss }) {
  if (!toasts.length) return null;

  return (
    <div
      className="toast-container"
      aria-label="Notifications"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} dismiss={dismiss} />
      ))}
    </div>
  );
}
