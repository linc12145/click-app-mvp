export interface Game {
    id: string;
    title: string;
    amount: number;
    status: 'Pending' | 'Active' | 'Complete';
    opponent: string;
}
