/*
  Warnings:

  - A unique constraint covering the columns `[title,projectId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Task_title_projectId_key" ON "public"."Task"("title", "projectId");
