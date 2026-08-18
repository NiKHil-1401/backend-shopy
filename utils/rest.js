import crypto from "crypto";

export const generateResetToken = () => {
  const resetToken = crypto.randomBytes(20).toString("hex");

  const resetTokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  return { resetToken, resetTokenHash };
};
