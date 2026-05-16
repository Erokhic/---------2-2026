export async function getStatuses() {
        let response = await fetch(`http://localhost:3000/statuses`);
        const result = await response.json();
        return result;
}