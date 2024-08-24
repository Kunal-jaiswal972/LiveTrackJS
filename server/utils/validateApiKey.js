const validApiKeys = new Set([
  "abc123-def456-ghi789-jkl012",
  "mno345-pqr678-stu901-vwx234",
  "yz012-abc345-def678-ghi901",
]);

export const validateApiKey = (apiKey) => {
  return validApiKeys.has(apiKey);
};
