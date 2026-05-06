export const handle = async ({ event, resolve }) => {
    console.log('Origin:', event.request.headers.get('origin'));
    console.log('Host:', event.request.headers.get('host'));
    return resolve(event);
};