"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getWorkspaces() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const workspaces = await prisma.workspace.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
    select: {
      id: true,
      name: true,
      description: true,
      language: true,
      color: true,
      iconColor: true,
      updatedAt: true,
    }
  });

  return workspaces;
}

export async function createWorkspace(data: { name: string, language: string, content: string, color?: string, iconColor?: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  let color = data.color || "from-blue-500/20 to-indigo-500/20";
  let iconColor = data.iconColor || "text-blue-400";
  
  if (data.language === "javascript" || data.language === "typescript") {
    color = "from-amber-500/20 to-orange-500/20";
    iconColor = "text-amber-400";
  } else if (data.language === "python") {
    color = "from-emerald-500/20 to-teal-500/20";
    iconColor = "text-emerald-400";
  } else if (data.language === "css" || data.language === "html") {
    color = "from-purple-500/20 to-pink-500/20";
    iconColor = "text-purple-400";
  }

  const workspace = await prisma.workspace.create({
    data: {
      name: data.name,
      description: `A CodeVerse ${data.language} project`,
      language: data.language,
      color,
      iconColor,
      content: data.content,
      userId: session.user.id,
    }
  });

  return workspace;
}

export async function getWorkspaceContent(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const workspace = await prisma.workspace.findUnique({
    where: {
      id,
      userId: session.user.id
    }
  });

  if (!workspace) {
    throw new Error("Workspace not found");
  }

  return workspace;
}

export async function updateWorkspace(id: string, content: string, name?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  
  const data: any = { content };
  if (name) data.name = name;

  const workspace = await prisma.workspace.update({
    where: {
      id,
      userId: session.user.id
    },
    data
  });

  return workspace;
}

export async function deleteWorkspace(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await prisma.workspace.delete({
    where: {
      id,
      userId: session.user.id
    }
  });

  return { success: true };
}
