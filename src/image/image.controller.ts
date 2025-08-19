import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common"
import { ImageService } from "./image.service"
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiBearerAuth } from "@nestjs/swagger"
import { JwtAuthGuard } from "@/guards/jwt-auth.guard"
import type { Response } from "express"

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

  @Get("download/:id")
  async downloadImage(
    @Param("id") id: string,
    @Res({ passthrough: true }) res: Response
  ) {
    await this.imagesService.downloadImage(id, res)
  }
}
