import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common"
import { ImageService } from "./image.service"
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express"
import { ApiBearerAuth, ApiParam } from "@nestjs/swagger"
import { JwtAuthGuard } from "@/guards/jwt-auth.guard"
import type { Response } from "express"
import { TASK_SWAGGER_EXAMPLES } from "@/constants/swagger/task.example"

@ApiBearerAuth()
@Controller("image")
@UseGuards(JwtAuthGuard)
export class ImageController {
  constructor(private imagesService: ImageService) {}

  @Post("avatar")
  @UseInterceptors(FileInterceptor("file"))
  async uploadUserAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Req() req
  ) {
    const userId: string = req.user.userId
    return this.imagesService.uploadUserAvatar(file, userId)
  }

  @Post("projectCover/:projectId")
  @UseInterceptors(FileInterceptor("file"))
  async uploadProjectCover(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    @Param("projectId", new ParseUUIDPipe()) projectId: string
  ) {
    const userId: string = req.user.userId
    return this.imagesService.uploadProjectCover(file, projectId, userId)
  }

  @Post("task/:taskId")
  @UseInterceptors(FilesInterceptor("files"))
  async uploadTaskImages(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req,
    @Param("taskId", new ParseUUIDPipe()) taskId: string
  ) {
    const userId: string = req.user.userId
    return this.imagesService.uploadTaskImages(files, taskId, userId)
  }

  @Get("download/:id")
  async downloadImage(@Param("id") id: string, @Res() res: Response) {
    await this.imagesService.downloadImage(id, res)
  }

  @Delete(":id")
  @ApiParam({
    name: "id",
    required: true,
    type: String,
    format: "uuid",
    example: TASK_SWAGGER_EXAMPLES.UUID,
  })
  @HttpCode(204)
  delete(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.imagesService.delete(id)
  }
}
