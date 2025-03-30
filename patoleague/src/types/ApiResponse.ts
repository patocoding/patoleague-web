export type ApiResponse<T> = {
    data: T;
    error?: string;
}

// como usar ? const response = await api.get<ApiResponse<Player>>(`/players/player/${player}`);