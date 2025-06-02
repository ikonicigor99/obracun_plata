export async function graphqlRequest(query, variables = {}) {
    const res = await fetch('api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': ' application/json' },
        body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();
    console.log('Odgovor Graphql API', json);
    if (json.errors) throw new Error(json.errors[0].message);
    return json.data;
}