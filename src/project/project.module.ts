import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectMemberModule } from "@/project-member/project-member.module"

@Module({
  imports: [ProjectMemberModule],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
