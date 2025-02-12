import { Task } from "../utils/types";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

export const fetchTasks = async () => {
  const tasksCollection = collection(db, "tasks");
  const taskSnapshot = await getDocs(tasksCollection);
  return taskSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createTask = async (task: {
  title: string;
  category: string;
  dueDate: string;
  status: string;
}) => {
  const tasksCollection = collection(db, "tasks");
  await addDoc(tasksCollection, task);
};

export const updateTask = async (task: Task) => {
  const taskDoc = doc(db, "tasks", task.id);
  const updates = {
    title: task.title,
    category: task.category,
    dueDate: task.dueDate,
    status: task.status,
  };
  await updateDoc(taskDoc, updates);
};

export const deleteTask = async (id: string) => {
  const taskDoc = doc(db, "tasks", id);
  await deleteDoc(taskDoc);
};
