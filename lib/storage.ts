import { connectToDatabase } from './mongodb';
import { ObjectId } from 'mongodb';

export interface TaskData {
  _id?: ObjectId | string;
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
  createdAt: string;
  type: string;
  subtaskIds?: string[];
}

class TaskStorage {
  private collection = 'tasks';

  async getAllTasks() {
    try {
      const { db } = await connectToDatabase();
      const tasks = await db.collection(this.collection).find({}).toArray();
      return tasks.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        createdAt: task.createdAt,
        type: task.type,
        subtaskIds: task.subtaskIds,
        _id: task._id?.toString()
      }));
    } catch (error) {
      console.log('Failed to fetch tasks:', error);
      return [];
    }
  }

  async getTask(id: string) {
    try {
      const { db } = await connectToDatabase();
      const task = await db.collection(this.collection).findOne({ id });
      if (!task) return null;

      return {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        createdAt: task.createdAt,
        type: task.type,
        subtaskIds: task.subtaskIds,
        _id: task._id?.toString()
      };
    } catch (error) {
      console.log('Failed to get task:', error);
      return null;
    }
  }

  async addTask(task: TaskData) {
    try {
      const { db } = await connectToDatabase();
      const { _id, ...newTask } = task;
      const result = await db.collection(this.collection).insertOne(newTask);

      if (result.insertedId) {
        return { ...newTask, _id: result.insertedId };
      }
      return null;
    } catch (error) {
      console.log('Failed to add task:', error);
      return null;
    }
  }

  async updateTask(id: string, updates: Partial<TaskData>) {
    try {
      const { db } = await connectToDatabase();
      const result = await db.collection(this.collection).findOneAndUpdate(
        { id },
        { $set: updates },
        { returnDocument: 'after' }
      );

      if (result) {
        return {
          id: result.id,
          title: result.title,
          description: result.description,
          status: result.status,
          createdAt: result.createdAt,
          type: result.type,
          subtaskIds: result.subtaskIds,
          _id: result._id
        };
      }
      return null;
    } catch (error) {
      console.log('Failed to update task:', error);
      return null;
    }
  }

  async deleteTask(id: string) {
    try {
      const { db } = await connectToDatabase();
      const result = await db.collection(this.collection).deleteOne({ id });
      return result.deletedCount > 0;
    } catch (error) {
      console.log('Failed to delete task:', error);
      return false;
    }
  }

  async toggleTaskStatus(id: string) {
    try {
      const { db } = await connectToDatabase();
      const task = await db.collection(this.collection).findOne({ id });
      
      if (!task) return null;
      
      const newStatus = task.status === "pending" ? "completed" : "pending";
      const result = await db.collection(this.collection).findOneAndUpdate(
        { id },
        { $set: { status: newStatus } },
        { returnDocument: 'after' }
      );

      if (result) {
        return {
          id: result.id,
          title: result.title,
          description: result.description,
          status: result.status,
          createdAt: result.createdAt,
          type: result.type,
          subtaskIds: result.subtaskIds,
          _id: result._id
        };
      }
      return null;
    } catch (error) {
      console.log('Failed to toggle status:', error);
      return null;
    }
  }

  async getStats() {
    try {
      const { db } = await connectToDatabase();
      const coll = db.collection(this.collection);
      
      const total = await coll.countDocuments();
      const pending = await coll.countDocuments({ status: "pending" });
      const completed = await coll.countDocuments({ status: "completed" });
      
      return { total, pending, completed };
    } catch (error) {
      console.log('Failed to get stats:', error);
      return { total: 0, pending: 0, completed: 0 };
    }
  }

  async initializeSampleData() {
    try {
      const { db } = await connectToDatabase();
      const coll = db.collection(this.collection);
      
      const count = await coll.countDocuments();
      if (count === 0) {
        const samples = [
          {
            id: "1764418499159",
            title: "Sample Task 1",
            description: "This is a sample task to get you started",
            status: "completed",
            createdAt: "2025-11-29T12:14:59.159Z",
            type: "simple"
          },
          {
            id: "1764418511456",
            title: "Sample Task 2", 
            description: "Another sample task",
            status: "pending",
            createdAt: "2025-11-29T12:15:11.456Z",
            type: "simple"
          },
          {
            id: "1764418525454",
            title: "Sample Task 3", 
            description: "A third sample task",
            status: "pending",
            createdAt: "2025-11-29T12:15:25.454Z",
            type: "simple"
          }
        ];
        
        await coll.insertMany(samples);
        console.log('Sample data initialized');
      }
    } catch (error) {
      console.log('Failed to initialize data:', error);
    }
  }
}

export const storage = new TaskStorage();