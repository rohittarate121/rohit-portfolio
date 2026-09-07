export function mapCertificationFromApi(apiCert) {
  return {
    id: apiCert.id,
    name: apiCert.name,
    org: apiCert.organization,
    date: apiCert.date,
    credentialId: apiCert.credentialId,
    certificateUrl: apiCert.certificateUrl,
    verifyUrl: apiCert.verificationUrl,
  };
}
