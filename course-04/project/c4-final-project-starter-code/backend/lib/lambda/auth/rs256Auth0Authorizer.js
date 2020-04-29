import 'source-map-support/register';
import { verify } from 'jsonwebtoken';
const cert = `-----BEGIN CERTIFICATE-----
MIIDBzCCAe+gAwIBAgIJFw4HMBuxENuCMA0GCSqGSIb3DQEBCwUAMCExHzAdBgNV
BAMTFmRldi1icXVjMWtnbC5hdXRoMC5jb20wHhcNMjAwNDI3MTk0MDQ0WhcNMzQw
MTA0MTk0MDQ0WjAhMR8wHQYDVQQDExZkZXYtYnF1YzFrZ2wuYXV0aDAuY29tMIIB
IjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA9vY+fWzsEuCWOUQLzcHonFsZ
xUzgdzaiYt2TgT78Hp8icO2II5ERT1a8bBlLMOPtkOIp70VeZPK8+bU4MxD22FOp
WAG9QwZO0d3QGzEJIYMOL8OrC0Qxrk197JTvdWdYeUZ+Qx5fQiBZI8zRRGLlXzAd
wi1KWVvssjrHJgtXkbDw9iczuNxTBmJ+LQGYYTUWTQQ9oFV45qh3yjmpqJ0Jhbg9
6pTr1kAfHL17k8ZNQzzOamt+EWLz2blZETlmvx7AUa4116VPV/SHOw1UWljljl67
tv637M7pd5/Nt2kCpxu1KXxdlP/Bb91ekyjE1Fnz0CrZGXKSRB3DOXV5eE6A8wID
AQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBRv2ikxkcJ/hrudjZph
CHCAIy+cnjAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAIWM+AAd
l8ydganUV/SgVRvwXBhJoNwcQZxPYBdMDR5Q9oYru+OZWEfN6Ynh2b2FXHP3Iw+3
LfHLhoQMwM8yJftgTGUchimWja6haVgMFRatymghrXkDwlSDHlh67Lvolni/HtmG
OnJAwfMkXK7pIAymg8WILT9ypVFNZEFbnoKgqQoxGUCYFw9MX03iq7uZ0D/ZYMwP
bco27Kb8nWQUCQAoQujjSMpXR/LcYgkXUaIpbE/c0xZaywu7HscQgB7Cac9uVNa7
w6P+4XTaip5FMdyUSBVUW9qzKcB6qH628v5hkNxswCEHckuXQPcbBHX43nMe6R6i
Br+xYzgU89pvmuM=
-----END CERTIFICATE-----`;
export const handler = async (event) => {
    try {
        const jwtToken = verifyToken(event.authorizationToken);
        console.log('User was authorized', jwtToken);
        return {
            principalId: jwtToken.sub,
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Allow',
                        Resource: '*'
                    }
                ]
            }
        };
    }
    catch (e) {
        console.log('User authorized', e.message);
        return {
            principalId: 'user',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Deny',
                        Resource: '*'
                    }
                ]
            }
        };
    }
};
function verifyToken(authHeader) {
    if (!authHeader)
        throw new Error('No authentication header');
    if (!authHeader.toLowerCase().startsWith('bearer '))
        throw new Error('Invalid authentication header');
    const split = authHeader.split(' ');
    const token = split[1];
    return verify(token, cert, { algorithms: ['RS256'] });
}
//# sourceMappingURL=rs256Auth0Authorizer.js.map