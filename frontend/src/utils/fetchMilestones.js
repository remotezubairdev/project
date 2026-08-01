import { api } from './../api/api';
export default async function fetchMilestones() {
    try {
        const response = await api.get("/api/milestones")
        return response.data
    } catch (error) {
        return error
    }
}