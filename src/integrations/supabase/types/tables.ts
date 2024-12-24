export type Tables = {
  chat_rooms: {
    Row: {
      created_at: string | null;
      host_id: string | null;
      id: string;
      participants: string[];
      subject_category: string;
    };
    Insert: {
      created_at?: string | null;
      host_id?: string | null;
      id: string;
      participants: string[];
      subject_category?: string;
    };
    Update: {
      created_at?: string | null;
      host_id?: string | null;
      id?: string;
      participants?: string[];
      subject_category?: string;
    };
    Relationships: [
      {
        foreignKeyName: "chat_rooms_host_id_fkey";
        columns: ["host_id"];
        isOneToOne: false;
        referencedRelation: "users";
        referencedColumns: ["id"];
      }
    ];
  };
  messages: {
    Row: {
      chat_room_id: string | null;
      content: string;
      created_at: string | null;
      id: string;
      user_id: string | null;
    };
    Insert: {
      chat_room_id?: string | null;
      content: string;
      created_at?: string | null;
      id?: string;
      user_id?: string | null;
    };
    Update: {
      chat_room_id?: string | null;
      content?: string;
      created_at?: string | null;
      id?: string;
      user_id?: string | null;
    };
    Relationships: [
      {
        foreignKeyName: "messages_chat_room_id_fkey";
        columns: ["chat_room_id"];
        isOneToOne: false;
        referencedRelation: "chat_rooms";
        referencedColumns: ["id"];
      },
      {
        foreignKeyName: "messages_user_id_fkey";
        columns: ["user_id"];
        isOneToOne: false;
        referencedRelation: "users";
        referencedColumns: ["id"];
      }
    ];
  };
  profiles: {
    Row: {
      avatar_url: string | null;
      id: string;
      updated_at: string | null;
    };
    Insert: {
      avatar_url?: string | null;
      id: string;
      updated_at?: string | null;
    };
    Update: {
      avatar_url?: string | null;
      id?: string;
      updated_at?: string | null;
    };
    Relationships: [];
  };
  users: {
    Row: {
      created_at: string | null;
      email: string | null;
      id: string;
    };
    Insert: {
      created_at?: string | null;
      email?: string | null;
      id: string;
    };
    Update: {
      created_at?: string | null;
      email?: string | null;
      id?: string;
    };
    Relationships: [];
  };
  waiting_room: {
    Row: {
      created_at: string | null;
      id: string;
      user_id: string | null;
    };
    Insert: {
      created_at?: string | null;
      id?: string;
      user_id?: string | null;
    };
    Update: {
      created_at?: string | null;
      id?: string;
      user_id?: string | null;
    };
    Relationships: [
      {
        foreignKeyName: "waiting_room_user_id_fkey";
        columns: ["user_id"];
        isOneToOne: false;
        referencedRelation: "users";
        referencedColumns: ["id"];
      }
    ];
  };
  waitlist: {
    Row: {
      id: string;
      email: string;
      created_at: string;
      status: string | null;
    };
    Insert: {
      email: string;
      id?: string;
      created_at?: string;
      status?: string | null;
    };
    Update: {
      email?: string;
      id?: string;
      created_at?: string;
      status?: string | null;
    };
    Relationships: [];
  };
};