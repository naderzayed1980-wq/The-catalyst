export enum UserRole {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
  PARENT = "PARENT"
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  password?: string;
  // Parent relationship
  childrenIds?: string[]; // If PARENT, list of student IDs
  parentId?: string; // If STUDENT, parent's ID
  // Teacher metadata
  specialization?: string; // If TEACHER
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  image: string;
  teacherId: string;
  code: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  code: string;
  subjectIds: string[]; // المواد الدراسية التابعة للدورة
  teacherIds: string[]; // المعلمون المسؤولون عن الدورة
  createdAt: string;
}

export interface Unit {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  order: number;
}

export interface Lesson {
  id: string;
  unitId: string;
  subjectId: string;
  title: string;
  content: string; // Markdown summary/guide
  videoUrl?: string; // Recorded lecture link
  pdfUrl?: string;
  pdfName?: string;
  order: number;
  duration: string; // e.g. "45 دقيقة"
}

export interface Assignment {
  id: string;
  lessonId: string;
  subjectId: string;
  title: string;
  description: string;
  questions: {
    id: string;
    type: "MULTIPLE_CHOICE" | "SHORT_ANSWER";
    questionText: string;
    options?: string[]; // For MCQ
    correctAnswer: string;
  }[];
  dueDate: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  answers: {
    questionId: string;
    answerText: string;
  }[];
  status: "SUBMITTED" | "GRADED";
  grade?: number; // Score out of 100
  feedback?: string;
  submittedAt: string;
}

export interface Quiz {
  id: string;
  subjectId: string;
  title: string;
  durationMinutes: number;
  questions: {
    id: string;
    questionText: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
  }[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  score: number; // Percentage
  answers: number[]; // Index of selected options
  completedAt: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  subjectId: string;
  replies: {
    id: string;
    content: string;
    authorId: string;
    authorName: string;
    authorRole: UserRole;
    createdAt: string;
  }[];
  createdAt: string;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface EducationalResource {
  id: string;
  title: string;
  type: "BOOK" | "ARTICLE" | "VIDEO" | "EXTERNAL_LINK";
  category: string;
  url: string;
  description: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  subjectId: string;
}

export interface SystemLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  timestamp: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  targetRole?: UserRole;
  targetUserId?: string;
  createdAt: string;
  read?: boolean;
}

export interface PromotionCampaign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  active: boolean;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string; // YYYY-MM-DD
  status: "PRESENT" | "ABSENT" | "LATE";
  checkInTime?: string; // HH:MM AM/PM
  checkOutTime?: string; // HH:MM AM/PM
  updatedByTeacherId?: string;
  notifiedParent?: boolean;
}

