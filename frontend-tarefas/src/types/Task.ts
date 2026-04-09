export interface Task {
id: number;
title: string;
status: 'pending' | 'completed';
category: string;
created_at: string;
}