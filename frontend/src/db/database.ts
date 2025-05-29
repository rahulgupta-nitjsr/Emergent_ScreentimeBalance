import Dexie, { Table } from 'dexie';

export interface DailyData {
  id?: number;
  date: string;
  timers: {
    outdoor: number;
    exercise: number;
    productive: number;
    sleep: number;
  };
  screenTimeEarned: number;
  screenTimeUsed: number;
  status: 'green' | 'yellow' | 'red';
}

export interface StreakData {
  id?: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
}

export class ScreenTimeDB extends Dexie {
  dailyData!: Table<DailyData>;
  streakData!: Table<StreakData>;

  constructor() {
    super('ScreenTimeDatabase');
    
    this.version(1).stores({
      dailyData: '++id, date',
      streakData: '++id'
    });
  }
}

export const db = new ScreenTimeDB();

// Database helper functions
export const saveDailyData = async (data: Omit<DailyData, 'id'>) => {
  try {
    const existing = await db.dailyData.where('date').equals(data.date).first();
    if (existing) {
      await db.dailyData.update(existing.id!, data);
    } else {
      await db.dailyData.add(data);
    }
  } catch (error) {
    console.error('Error saving daily data:', error);
  }
};

export const loadDailyData = async (date: string): Promise<DailyData | undefined> => {
  try {
    return await db.dailyData.where('date').equals(date).first();
  } catch (error) {
    console.error('Error loading daily data:', error);
    return undefined;
  }
};

export const getStreak = async (): Promise<StreakData> => {
  try {
    const streak = await db.streakData.toCollection().first();
    return streak || { currentStreak: 0, longestStreak: 0, lastActivityDate: '' };
  } catch (error) {
    console.error('Error getting streak:', error);
    return { currentStreak: 0, longestStreak: 0, lastActivityDate: '' };
  }
};

export const updateStreak = async (streak: StreakData) => {
  try {
    const existing = await db.streakData.toCollection().first();
    if (existing) {
      await db.streakData.update(existing.id!, streak);
    } else {
      await db.streakData.add(streak);
    }
  } catch (error) {
    console.error('Error updating streak:', error);
  }
};