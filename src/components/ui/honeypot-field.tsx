"use client";

/**
 * Off-screen input real users never see or touch. Positioned off-screen
 * rather than display:none, which some bots detect. Any value submitted
 * in this field marks the request as spam server-side.
 */
export default function HoneypotField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: "-9999px", top: 0, height: 0, overflow: "hidden" }}
    >
      <label htmlFor="website-field">Website</label>
      <input
        type="text"
        id="website-field"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
