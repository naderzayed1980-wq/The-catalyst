import { useState, useEffect } from "react";
import { User, UserRole, Subject, Course, Unit, Lesson, Assignment, AssignmentSubmission, Quiz, QuizAttempt, ForumPost, DirectMessage, EducationalResource, GlossaryTerm, SystemLog, SystemNotification, PromotionCampaign, AttendanceRecord } from "./types";
import { 
  defaultUsers, 
  initialSubjects, 
  initialCourses,
  initialUnits, 
  initialLessons, 
  initialAssignments, 
  initialSubmissions, 
  initialQuizzes, 
  initialQuizAttempts, 
  initialForumPosts, 
  initialDirectMessages, 
  initialResources, 
  initialGlossary, 
  initialPromotions, 
  initialNotifications, 
  initialLogs,
  initialAttendance
} from "./data/mockData";
import { Header, AIChatbot, DirectMessagesHub, PromotionSlider } from "./components/CommonUI";
import { Login } from "./components/Login";
import { AdminDashboard } from "./components/AdminDashboard";
import { TeacherDashboard } from "./components/TeacherDashboard";
import { StudentDashboard } from "./components/StudentDashboard";
import { ParentDashboard } from "./components/ParentDashboard";
import { Sparkles, Shield, User as UserIcon, LogOut, CheckCircle } from "lucide-react";

export default function App() {
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("manara_dark_mode");
    return saved === "true";
  });

  // Language state (Persist with LocalStorage)
  const [language, setLanguage] = useState<"ar" | "en">(() => {
    const saved = localStorage.getItem("manara_language");
    return (saved as "ar" | "en") || "ar";
  });

  const handleToggleLanguage = () => {
    setLanguage(prev => {
      const next = prev === "ar" ? "en" : "ar";
      localStorage.setItem("manara_language", next);
      return next;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("manara_dark_mode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("manara_dark_mode", "false");
    }
  }, [isDarkMode]);

  // Master Database States loaded from LocalStorage or default mockData
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem("manara_users");
    const loadedUsers: User[] = saved ? JSON.parse(saved) : defaultUsers;
    
    // Ensure that naderzayed1980@gmail.com is present and is the system administrator
    const hasNader = loadedUsers.some(u => u.email === "naderzayed1980@gmail.com" && u.role === UserRole.ADMIN);
    if (!hasNader) {
      // Remove any old generic admin with email 'admin@manara.com' to make nader the unique system admin
      const filtered = loadedUsers.filter(u => u.email !== "admin@manara.com" && u.role !== UserRole.ADMIN);
      const newAdmin: User = {
        id: "admin-nader",
        name: "م. نادر زايد",
        email: "naderzayed1980@gmail.com",
        role: UserRole.ADMIN,
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
        phone: "01012345678",
        password: "74@ 1986"
      };
      const updated = [newAdmin, ...filtered];
      localStorage.setItem("manara_users", JSON.stringify(updated));
      return updated;
    }
    
    // Also make sure all loaded users have passwords if they don't
    let changed = false;
    const withPasswords = loadedUsers.map(u => {
      if (!u.password) {
        changed = true;
        return { ...u, password: u.email === "naderzayed1980@gmail.com" ? "74@ 1986" : "123456" };
      }
      return u;
    });
    if (changed) {
      localStorage.setItem("manara_users", JSON.stringify(withPasswords));
      return withPasswords;
    }
    
    return loadedUsers;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem("manara_attendance");
    return saved ? JSON.parse(saved) : initialAttendance;
  });

  useEffect(() => {
    localStorage.setItem("manara_attendance", JSON.stringify(attendance));
  }, [attendance]);

  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem("manara_subjects");
    return saved ? JSON.parse(saved) : initialSubjects;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem("manara_courses");
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [units, setUnits] = useState<Unit[]>(() => {
    const saved = localStorage.getItem("manara_units");
    return saved ? JSON.parse(saved) : initialUnits;
  });

  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const saved = localStorage.getItem("manara_lessons");
    return saved ? JSON.parse(saved) : initialLessons;
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem("manara_assignments");
    return saved ? JSON.parse(saved) : initialAssignments;
  });

  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(() => {
    const saved = localStorage.getItem("manara_submissions");
    return saved ? JSON.parse(saved) : initialSubmissions;
  });

  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    const saved = localStorage.getItem("manara_quizzes");
    return saved ? JSON.parse(saved) : initialQuizzes;
  });

  const [attempts, setAttempts] = useState<QuizAttempt[]>(() => {
    const saved = localStorage.getItem("manara_attempts");
    return saved ? JSON.parse(saved) : initialQuizAttempts;
  });

  const [posts, setPosts] = useState<ForumPost[]>(() => {
    const saved = localStorage.getItem("manara_posts");
    return saved ? JSON.parse(saved) : initialForumPosts;
  });

  const [directMessages, setDirectMessages] = useState<DirectMessage[]>(() => {
    const saved = localStorage.getItem("manara_messages");
    return saved ? JSON.parse(saved) : initialDirectMessages;
  });

  const [resources, setResources] = useState<EducationalResource[]>(() => {
    const saved = localStorage.getItem("manara_resources");
    return saved ? JSON.parse(saved) : initialResources;
  });

  const [glossary, setGlossary] = useState<GlossaryTerm[]>(() => {
    const saved = localStorage.getItem("manara_glossary");
    return saved ? JSON.parse(saved) : initialGlossary;
  });

  const [campaigns, setCampaigns] = useState<PromotionCampaign[]>(() => {
    const saved = localStorage.getItem("manara_campaigns");
    return saved ? JSON.parse(saved) : initialPromotions;
  });

  const [notifications, setNotifications] = useState<SystemNotification[]>(() => {
    const saved = localStorage.getItem("manara_notifications");
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [logs, setLogs] = useState<SystemLog[]>(() => {
    const saved = localStorage.getItem("manara_logs");
    return saved ? JSON.parse(saved) : initialLogs;
  });

  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("manara_completed_lessons");
    return saved ? JSON.parse(saved) : ["les-1"]; // Preload one completed lesson for student progress bar visualization
  });

  // Current session states loaded from localStorage
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("manara_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem("manara_current_user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.role;
      } catch (e) {
        return UserRole.STUDENT;
      }
    }
    return UserRole.STUDENT;
  });

  // Chat window visibility states
  const [isDMChatOpen, setIsDMChatOpen] = useState(false);

  // Sync state to localStorage on any updates
  useEffect(() => {
    localStorage.setItem("manara_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("manara_subjects", JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem("manara_courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("manara_units", JSON.stringify(units));
  }, [units]);

  useEffect(() => {
    localStorage.setItem("manara_lessons", JSON.stringify(lessons));
  }, [lessons]);

  useEffect(() => {
    localStorage.setItem("manara_assignments", JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem("manara_submissions", JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem("manara_quizzes", JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem("manara_attempts", JSON.stringify(attempts));
  }, [attempts]);

  useEffect(() => {
    localStorage.setItem("manara_posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem("manara_messages", JSON.stringify(directMessages));
  }, [directMessages]);

  useEffect(() => {
    localStorage.setItem("manara_resources", JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem("manara_glossary", JSON.stringify(glossary));
  }, [glossary]);

  useEffect(() => {
    localStorage.setItem("manara_campaigns", JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem("manara_notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("manara_logs", JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem("manara_completed_lessons", JSON.stringify(completedLessonIds));
  }, [completedLessonIds]);


  // Handler to switch simulated roles for instant preview
  const handleRoleChange = (role: UserRole) => {
    const found = users.find(u => u.role === role);
    if (found) {
      setCurrentUser(found);
      setCurrentRole(role);
      localStorage.setItem("manara_current_user", JSON.stringify(found));
      
      // Log action
      addLog(found, "تبديل مظهر الحساب", `معاينة لوحة تحكم ${role}`);
    }
  };

  // Auth Handlers
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    localStorage.setItem("manara_current_user", JSON.stringify(user));
    
    // Log action
    const newLog: SystemLog = {
      id: `log-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: "تسجيل الدخول",
      details: "تم تسجيل الدخول بنجاح إلى المنصة",
      timestamp: new Date().toISOString()
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const handleLogout = () => {
    if (currentUser) {
      const newLog: SystemLog = {
        id: `log-${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        userRole: currentUser.role,
        action: "تسجيل الخروج",
        details: "تم تسجيل الخروج من الجلسة الحالية",
        timestamp: new Date().toISOString()
      };
      setLogs(prev => [newLog, ...prev]);
    }
    setCurrentUser(null);
    localStorage.removeItem("manara_current_user");
  };

  // Attendance Date helper
  const getTodayDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleStudentCheckIn = (studentId: string, name: string) => {
    const today = getTodayDateString();
    setAttendance(prev => {
      const existing = prev.find(r => r.studentId === studentId && r.date === today);
      const nowStr = new Date().toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
      if (existing) {
        return prev.map(r => r.id === existing.id ? { 
          ...r, 
          status: "PRESENT" as const,
          checkInTime: r.checkInTime || nowStr 
        } : r);
      } else {
        return [...prev, {
          id: `att-${Date.now()}`,
          studentId,
          studentName: name,
          date: today,
          status: "PRESENT",
          checkInTime: nowStr
        }];
      }
    });

    if (currentUser) {
      addLog(currentUser, "تسجيل الحضور اليومي", `تم تسجيل حضور الطالب ${name} بنجاح`);
    }
  };

  const handleStudentCheckOut = (studentId: string, name: string) => {
    const today = getTodayDateString();
    setAttendance(prev => {
      const existing = prev.find(r => r.studentId === studentId && r.date === today);
      const nowStr = new Date().toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
      if (existing) {
        return prev.map(r => r.id === existing.id ? { 
          ...r, 
          checkOutTime: nowStr
        } : r);
      } else {
        return [...prev, {
          id: `att-${Date.now()}`,
          studentId,
          studentName: name,
          date: today,
          status: "PRESENT",
          checkOutTime: nowStr
        }];
      }
    });

    if (currentUser) {
      addLog(currentUser, "تسجيل الانصراف اليومي", `تم تسجيل انصراف الطالب ${name} بنجاح`);
    }
  };

  const handleTeacherUpdateAttendance = (
    studentId: string, 
    studentName: string, 
    date: string, 
    status: "PRESENT" | "ABSENT" | "LATE", 
    checkInTime?: string, 
    checkOutTime?: string,
    notifyParent: boolean = false
  ) => {
    setAttendance(prev => {
      const existing = prev.find(r => r.studentId === studentId && r.date === date);
      if (existing) {
        return prev.map(r => r.id === existing.id ? { 
          ...r, 
          status, 
          checkInTime: checkInTime !== undefined ? checkInTime : r.checkInTime, 
          checkOutTime: checkOutTime !== undefined ? checkOutTime : r.checkOutTime,
          updatedByTeacherId: currentUser?.id,
          notifiedParent: notifyParent ? true : r.notifiedParent
        } : r);
      } else {
        return [...prev, {
          id: `att-${Date.now()}`,
          studentId,
          studentName,
          date,
          status,
          checkInTime,
          checkOutTime,
          updatedByTeacherId: currentUser?.id,
          notifiedParent: notifyParent
        }];
      }
    });

    if (notifyParent) {
      const studentObj = users.find(u => u.id === studentId);
      if (studentObj && studentObj.parentId) {
        const parentId = studentObj.parentId;
        const notifMsg = `نحيطكم علماً بغياب الطالب ${studentName} اليوم الموافق ${date}. نرجو التواصل مع المدرسة لتأكيد سبب الغياب وتأمين سلامته.`;
        const newNotif: SystemNotification = {
          id: `not-${Date.now()}`,
          title: "🚨 تنبيه غياب طارئ",
          message: notifMsg,
          targetRole: UserRole.PARENT,
          targetUserId: parentId,
          createdAt: new Date().toISOString(),
          read: false
        };

        setNotifications(prev => [newNotif, ...prev]);

        if (currentUser) {
          addLog(currentUser, "إرسال تنبيه غياب لولي الأمر", `تم إرسال إشعار غياب لولي أمر الطالب ${studentName}`);
        }
      }
    } else {
      if (currentUser) {
        addLog(currentUser, "تحديث سجل الحضور", `قام المعلم بتحديث حالة حضور الطالب ${studentName} إلى ${status === "PRESENT" ? "حاضر" : status === "ABSENT" ? "غائب" : "متأخر"}`);
      }
    }
  };

  // Log helper
  const addLog = (user: User, action: string, details: string) => {
    const newLog: SystemLog = {
      id: `log-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action,
      details,
      timestamp: new Date().toISOString()
    };
    setLogs(prev => [newLog, ...prev]);
  };

  // SUBJECT CRUD
  const handleAddSubject = (subj: Omit<Subject, "id">) => {
    const newSubj: Subject = {
      ...subj,
      id: `sub-${Date.now()}`
    };
    setSubjects(prev => [...prev, newSubj]);
    addLog(currentUser, "إضافة مادة", `إنشاء مادة جديدة: ${subj.name}`);
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(prev => prev.filter(s => s.id !== id));
    // Cascade delete units and lessons
    setUnits(prev => prev.filter(u => u.subjectId !== id));
    setLessons(prev => prev.filter(l => l.subjectId !== id));
    addLog(currentUser, "حذف مادة", `إزالة مادة بمعرف ${id} وكل متعلقاتها`);
  };

  const handleUpdateSubject = (id: string, subj: Partial<Subject>) => {
    setSubjects(prev => prev.map(s => s.id === id ? { ...s, ...subj } : s));
  };

  // COURSE CRUD
  const handleAddCourse = (crs: Omit<Course, "id">) => {
    const newCourse: Course = {
      ...crs,
      id: `crs-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setCourses(prev => [...prev, newCourse]);
    addLog(currentUser, "إضافة دورة جديدة", `إنشاء الدورة الدراسية: ${crs.name}`);
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    addLog(currentUser, "حذف دورة", `إزالة الدورة بمعرف ${id}`);
  };

  const handleUpdateCourse = (id: string, crs: Partial<Course>) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...crs } : c));
    addLog(currentUser, "تعديل دورة", `تحديث بيانات الدورة بمعرف ${id}`);
  };

  // UNIT CRUD
  const handleAddUnit = (unit: Omit<Unit, "id">) => {
    const newUnit: Unit = {
      ...unit,
      id: `unit-${Date.now()}`
    };
    setUnits(prev => [...prev, newUnit]);
    addLog(currentUser, "إضافة وحدة دراسية", `إضافة باب جديد: ${unit.title}`);
  };

  const handleDeleteUnit = (id: string) => {
    setUnits(prev => prev.filter(u => u.id !== id));
    setLessons(prev => prev.filter(l => l.unitId !== id));
    addLog(currentUser, "حذف وحدة دراسية", `إزالة الباب بمعرف ${id}`);
  };

  // LESSON CRUD
  const handleAddLesson = (lesson: Omit<Lesson, "id">) => {
    const newLesson: Lesson = {
      ...lesson,
      id: `les-${Date.now()}`
    };
    setLessons(prev => [...prev, newLesson]);
    addLog(currentUser, "إضافة درس", `إضافة درس جديد: ${lesson.title}`);
    
    // Auto broadcast notification for students
    const sub = subjects.find(s => s.id === lesson.subjectId);
    const newNotif: SystemNotification = {
      id: `not-${Date.now()}`,
      title: "درس جديد متاح",
      message: `تم رفع درس جديد في مادة [${sub?.name}]: ${lesson.title}`,
      targetRole: UserRole.STUDENT,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleDeleteLesson = (id: string) => {
    setLessons(prev => prev.filter(l => l.id !== id));
    setCompletedLessonIds(prev => prev.filter(li => li !== id));
    addLog(currentUser, "حذف درس", `إزالة الدرس بمعرف ${id}`);
  };

  // ASSIGNMENTS & SUBMISSIONS
  const handleAddAssignment = (assign: Omit<Assignment, "id">) => {
    const newAssign: Assignment = {
      ...assign,
      id: `assign-${Date.now()}`
    };
    setAssignments(prev => [...prev, newAssign]);
    addLog(currentUser, "رفع واجب منزلي", `إنشاء واجب جديد: ${assign.title}`);

    // Notify students
    const sub = subjects.find(s => s.id === assign.subjectId);
    const newNotif: SystemNotification = {
      id: `not-${Date.now()}`,
      title: "واجب دراسي جديد",
      message: `أضاف المعلم واجباً دراسياً جديداً لمادة [${sub?.name}]: ${assign.title}`,
      targetRole: UserRole.STUDENT,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleSubmitAssignment = (assignmentId: string, answers: { questionId: string; answerText: string }[]) => {
    const newSubm: AssignmentSubmission = {
      id: `subm-${Date.now()}`,
      assignmentId,
      studentId: currentUser.id,
      answers,
      status: "SUBMITTED",
      submittedAt: new Date().toISOString()
    };
    setSubmissions(prev => [...prev, newSubm]);
    addLog(currentUser, "تسليم واجب", `تقديم حلول للواجب بمعرف ${assignmentId}`);

    // Auto evaluate MCQs if any for instant corrective grading simulator
    const assign = assignments.find(a => a.id === assignmentId);
    if (assign && assign.questions.every(q => q.type === "MULTIPLE_CHOICE")) {
      // Calculate grade instantly
      let correct = 0;
      assign.questions.forEach(q => {
        const studentAns = answers.find(a => a.questionId === q.id)?.answerText;
        if (studentAns === q.correctAnswer) {
          correct++;
        }
      });
      const finalGrade = Math.round((correct / assign.questions.length) * 100);
      
      // Auto upgrade submission status to graded
      setTimeout(() => {
        setSubmissions(prev => prev.map(s => s.id === newSubm.id ? {
          ...s,
          status: "GRADED",
          grade: finalGrade,
          feedback: `تصحيح آلي ذكي: حصلت على درجة ${finalGrade}% بناء على مطابقة إجابات الاختيار من متعدد النموذجية.`
        } : s));

        // Send parent notification
        if (currentUser.parentId) {
          const pNotif: SystemNotification = {
            id: `not-p-${Date.now()}`,
            title: "تحديث تقييم الابن",
            message: `حصل ابنك يوسف على درجة ${finalGrade}/100 في واجب: ${assign.title}`,
            targetUserId: currentUser.parentId,
            createdAt: new Date().toISOString()
          };
          setNotifications(prev => [pNotif, ...prev]);
        }
      }, 1500);
    }
  };

  const handleGradeSubmission = (submId: string, grade: number, feedback: string) => {
    setSubmissions(prev => prev.map(s => s.id === submId ? { ...s, status: "GRADED", grade, feedback } : s));
    
    // Log
    const subm = submissions.find(s => s.id === submId);
    const assign = assignments.find(a => a.id === subm?.assignmentId);
    const student = users.find(u => u.id === subm?.studentId);
    addLog(currentUser, "رصد درجة", `تقييم واجب الطالب ${student?.name} بدرجة ${grade}/100`);

    // Notify student and parent
    if (student) {
      const newNotif: SystemNotification = {
        id: `not-${Date.now()}`,
        title: "تم تصحيح واجبك",
        message: `رصد المعلم درجة واجب [${assign?.title}]: الدرجة ${grade}/100. ملاحظة: ${feedback}`,
        targetUserId: student.id,
        createdAt: new Date().toISOString()
      };
      setNotifications(prev => [newNotif, ...prev]);

      // If parent is linked
      if (student.parentId) {
        const parentNotif: SystemNotification = {
          id: `not-p-${Date.now()}`,
          title: "إشعار درجات الابن",
          message: `تم تصحيح واجب للابن [${student.name}] في مادة الفيزياء، الدرجة المرصودة: ${grade}/100`,
          targetUserId: student.parentId,
          createdAt: new Date().toISOString()
        };
        setNotifications(prev => [parentNotif, ...prev]);
      }
    }
  };

  // QUIZZES
  const handleSubmitQuizAttempt = (quizId: string, score: number, answers: number[]) => {
    const newAttempt: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      quizId,
      studentId: currentUser.id,
      score,
      answers,
      completedAt: new Date().toISOString()
    };
    setAttempts(prev => [...prev, newAttempt]);
    addLog(currentUser, "تقديم اختبار قصير", `إنجاز كويز بمعرف ${quizId} بنتيجة ${score}%`);

    // Send notification to parent
    if (currentUser.parentId) {
      const q = quizzes.find(qz => qz.id === quizId);
      const parentNotif: SystemNotification = {
        id: `not-p-${Date.now()}`,
        title: "نتيجة اختبار الابن",
        message: `أكمل الابن [${currentUser.name}] اختباراً قصيراً: [${q?.title}] وحصل على درجة: ${score}%`,
        targetUserId: currentUser.parentId,
        createdAt: new Date().toISOString()
      };
      setNotifications(prev => [parentNotif, ...prev]);
    }
  };

  // FORUM POSTS
  const handleAddForumPost = (title: string, content: string, subjectId: string) => {
    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      title,
      content,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      subjectId,
      replies: [],
      createdAt: new Date().toISOString()
    };
    setPosts(prev => [newPost, ...prev]);
    addLog(currentUser, "طرح نقاش بالمنتدى", `سؤال بالمنتدى: ${title}`);
  };

  const handleAddForumReply = (postId: string, replyContent: string) => {
    const newReply = {
      id: `rep-${Date.now()}`,
      content: replyContent,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      createdAt: new Date().toISOString()
    };

    setPosts(prev => prev.map(p => p.id === postId ? {
      ...p,
      replies: [...p.replies, newReply]
    } : p));

    addLog(currentUser, "تعليق بالمنتدى", `رد على السؤال بمعرف ${postId}`);
  };

  // DIRECT MESSAGING
  const handleSendDirectMessage = (receiverId: string, content: string) => {
    const newDM: DirectMessage = {
      id: `dm-${Date.now()}`,
      senderId: currentUser.id,
      receiverId,
      content,
      createdAt: new Date().toISOString(),
      read: false
    };
    setDirectMessages(prev => [...prev, newDM]);
  };

  // RESOURCES & GLOSSARY
  const handleAddGlossaryTerm = (term: Omit<GlossaryTerm, "id">) => {
    const newTerm: GlossaryTerm = {
      ...term,
      id: `gl-${Date.now()}`
    };
    setGlossary(prev => [...prev, newTerm]);
    addLog(currentUser, "إضافة مصطلح علمي", `إدخال مصطلح: ${term.term}`);
  };

  const handleAddResource = (res: Omit<EducationalResource, "id">) => {
    const newRes: EducationalResource = {
      ...res,
      id: `res-${Date.now()}`
    };
    setResources(prev => [...prev, newRes]);
    addLog(currentUser, "رفع مورد للمكتبة", `رفع ملف/مرجع: ${res.title}`);
  };

  // PROMOTIONS & CAMPAIGNS
  const handleAddCampaign = (camp: Omit<PromotionCampaign, "id">) => {
    const newCamp: PromotionCampaign = {
      ...camp,
      id: `promo-${Date.now()}`
    };
    setCampaigns(prev => [...prev, newCamp]);
    addLog(currentUser, "إطلاق إعلان ترويجي", `إنشاء حملة: ${camp.title}`);
  };

  const handleToggleCampaign = (id: string) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
    addLog(currentUser, "إزالة إعلان", `حذف حملة ترويجية بمعرف ${id}`);
  };

  // USER PERMISSIONS UPDATE
  const handleUpdateUserRole = (id: string, role: UserRole) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u));
    addLog(currentUser, "تغيير صلاحيات", `تعديل رتبة مستخدم بمعرف ${id} إلى ${role}`);
  };

  const handleAddUser = (user: Omit<User, "id">) => {
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}`
    };
    setUsers(prev => [...prev, newUser]);
    addLog(currentUser, "إضافة مستخدم جديد", `إنشاء حساب عضو جديد: ${user.name} (${user.role})`);
  };

  const handleDeleteUser = (id: string) => {
    if (id === currentUser?.id) {
      return;
    }
    setUsers(prev => prev.filter(u => u.id !== id));
    addLog(currentUser, "حذف مستخدم", `حذف حساب العضو بمعرف ${id}`);
  };

  // EXPORT / IMPORT STATE DATABASE (Actual implementation)
  const handleExportDatabase = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      users, subjects, units, lessons, assignments, submissions, quizzes, attempts, posts, directMessages, resources, glossary, campaigns, notifications, logs
    }, null, 2));
    
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "manara_educational_database_backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    addLog(currentUser, "تصدير قاعدة البيانات", "تنزيل ملف النسخة الاحتياطية بنجاح");
  };

  const handleImportDatabase = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.users && parsed.subjects && parsed.lessons) {
        if (parsed.users) setUsers(parsed.users);
        if (parsed.subjects) setSubjects(parsed.subjects);
        if (parsed.units) setUnits(parsed.units);
        if (parsed.lessons) setLessons(parsed.lessons);
        if (parsed.assignments) setAssignments(parsed.assignments);
        if (parsed.submissions) setSubmissions(parsed.submissions);
        if (parsed.quizzes) setQuizzes(parsed.quizzes);
        if (parsed.attempts) setAttempts(parsed.attempts);
        if (parsed.posts) setPosts(parsed.posts);
        if (parsed.directMessages) setDirectMessages(parsed.directMessages);
        if (parsed.resources) setResources(parsed.resources);
        if (parsed.glossary) setGlossary(parsed.glossary);
        if (parsed.campaigns) setCampaigns(parsed.campaigns);
        if (parsed.notifications) setNotifications(parsed.notifications);
        if (parsed.logs) setLogs(parsed.logs);
        
        addLog(currentUser, "استيراد قاعدة البيانات", "رفع واستعادة نسخة احتياطية بالكامل");
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  // Lesson status toggle helper
  const handleToggleLessonCompleted = (lessonId: string) => {
    setCompletedLessonIds(prev => {
      if (prev.includes(lessonId)) {
        addLog(currentUser, "إلغاء دراسة درس", `أزال علامة المكتمل عن الدرس بمعرف ${lessonId}`);
        return prev.filter(id => id !== lessonId);
      } else {
        addLog(currentUser, "إتمام دراسة درس", `حدد كدرس مكتمل ومقروء بمعرف ${lessonId}`);
        return [...prev, lessonId];
      }
    });
  };

  // Unread messages count calculation
  const unreadMessagesCount = currentUser 
    ? directMessages.filter(m => m.receiverId === currentUser.id && !m.read).length 
    : 0;

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleOpenDirectChatWithTeacher = (teacherId: string) => {
    setIsDMChatOpen(true);
  };

  if (!currentUser) {
    return (
      <Login 
        users={users} 
        onLoginSuccess={handleLoginSuccess} 
        isDarkMode={isDarkMode} 
        language={language}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300" id="app-root-container" dir={language === "ar" ? "rtl" : "ltr"}>
      
      {/* Platform Header */}
      <Header 
        currentUser={currentUser}
        onRoleChange={handleRoleChange}
        notifications={notifications.filter(
          n => !n.targetUserId || n.targetUserId === currentUser.id
        ).filter(
          n => !n.targetRole || n.targetRole === currentUser.role
        )}
        onMarkNotificationRead={handleMarkNotificationRead}
        onOpenChat={() => setIsDMChatOpen(true)}
        unreadMessagesCount={unreadMessagesCount}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onLogout={handleLogout}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Main Container Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Marketing / Campaign slider at top of students/parents view */}
        {(currentUser.role === UserRole.STUDENT || currentUser.role === UserRole.PARENT) && (
          <PromotionSlider campaigns={campaigns} />
        )}

        {/* Dynamic routing dashboard panels based on active user simulated role */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-800 shadow-sm transition-all" id="active-dashboard-canvas">
          {currentRole === UserRole.ADMIN && (
            <AdminDashboard 
              subjects={subjects}
              units={units}
              lessons={lessons}
              users={users}
              logs={logs}
              campaigns={campaigns}
              courses={courses}
              onAddSubject={handleAddSubject}
              onDeleteSubject={handleDeleteSubject}
              onUpdateSubject={handleUpdateSubject}
              onAddUnit={handleAddUnit}
              onDeleteUnit={handleDeleteUnit}
              onAddLesson={handleAddLesson}
              onDeleteLesson={handleDeleteLesson}
              onAddCampaign={handleAddCampaign}
              onToggleCampaign={handleToggleCampaign}
              onDeleteCampaign={handleDeleteCampaign}
              onUpdateUserRole={handleUpdateUserRole}
              onImportData={handleImportDatabase}
              onExportData={handleExportDatabase}
              onAddCourse={handleAddCourse}
              onDeleteCourse={handleDeleteCourse}
              onUpdateCourse={handleUpdateCourse}
              onAddUser={handleAddUser}
              onDeleteUser={handleDeleteUser}
              language={language}
              onToggleLanguage={handleToggleLanguage}
            />
          )}

          {currentRole === UserRole.TEACHER && (
            <TeacherDashboard 
              currentUser={currentUser}
              subjects={subjects}
              lessons={lessons}
              assignments={assignments}
              submissions={submissions}
              glossary={glossary}
              resources={resources}
              posts={posts}
              courses={courses}
              students={users.filter(u => u.role === UserRole.STUDENT)}
              attendance={attendance}
              onUpdateAttendance={handleTeacherUpdateAttendance}
              onAddAssignment={handleAddAssignment}
              onGradeSubmission={handleGradeSubmission}
              onAddGlossaryTerm={handleAddGlossaryTerm}
              onAddResource={handleAddResource}
              onAddForumReply={handleAddForumReply}
            />
          )}

          {currentRole === UserRole.STUDENT && (
            <StudentDashboard 
              currentUser={currentUser}
              subjects={subjects}
              units={units}
              lessons={lessons}
              assignments={assignments}
              submissions={submissions.filter(s => s.studentId === currentUser.id)}
              quizzes={quizzes}
              attempts={attempts.filter(a => a.studentId === currentUser.id)}
              posts={posts}
              resources={resources}
              glossary={glossary}
              courses={courses}
              attendance={attendance}
              onCheckIn={handleStudentCheckIn}
              onCheckOut={handleStudentCheckOut}
              onAddForumPost={handleAddForumPost}
              onAddForumReply={handleAddForumReply}
              onSubmitAssignment={handleSubmitAssignment}
              onSubmitQuizAttempt={handleSubmitQuizAttempt}
              completedLessonIds={completedLessonIds}
              onToggleLessonCompleted={handleToggleLessonCompleted}
            />
          )}

          {currentRole === UserRole.PARENT && (
            <ParentDashboard 
              currentUser={currentUser}
              students={users.filter(u => u.role === UserRole.STUDENT)}
              subjects={subjects}
              lessons={lessons}
              assignments={assignments}
              submissions={submissions}
              attempts={attempts}
              completedLessonIds={completedLessonIds}
              courses={courses}
              attendance={attendance}
              onOpenDirectChat={handleOpenDirectChatWithTeacher}
            />
          )}
        </div>

      </main>

      {/* Footer Branding block */}
      <footer className="border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mt-12 text-center text-xs text-gray-400 dark:text-slate-500 font-sans transition-colors duration-300">
        <p>© ٢٠٢٦ منصة The Catalyst التعليمية المتكاملة. جميع الحقوق محفوظة.</p>
        <p className="font-mono text-[9px] mt-1 text-gray-300 dark:text-slate-600">مبني وفق أرقى معايير إدارة العملية التعليمية والرقابة الأبوية</p>
      </footer>

      {/* Floating Smart AI assistant (available across all roles for outstanding supportive experience) */}
      <AIChatbot studentName={currentUser.name} />

      {/* Direct Messaging Sidebar/Overlay Dialog */}
      <DirectMessagesHub 
        isOpen={isDMChatOpen}
        onClose={() => setIsDMChatOpen(false)}
        currentUser={currentUser}
        allUsers={users}
        messages={directMessages}
        onSendMessage={handleSendDirectMessage}
      />

    </div>
  );
}
