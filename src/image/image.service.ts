import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "@/prisma/prisma.service"
import { writeFileSync, existsSync, mkdirSync, createReadStream } from "fs"
import { join } from "path"
import { randomBytes } from "crypto"
import { Response } from "express"

@Injectable()
export class ImageService {
  private uploadDir = join(process.cwd(), "uploads")

  constructor(private prisma: PrismaService) {
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true })
    }
  }

  private generateFileName(ext: string) {
    return `${randomBytes(16).toString("hex")}.${ext}`
  }

  private saveFile(file: Express.Multer.File) {
    const extension = file.originalname.split(".").pop() || "png"
    const fileName = this.generateFileName(extension)
    const filePath = join(this.uploadDir, fileName)

    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true })
    }

    writeFileSync(filePath, file.buffer)

    return { fileName, filePath, extension }
  }

  async uploadUserAvatar(file: Express.Multer.File, userId: string) {
    const { fileName } = this.saveFile(file)

    const image = await this.prisma.image.create({
      data: {
        url: `/uploads/${fileName}`,
        filename: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        userId,
        userAvatar: { connect: { id: userId } },
      },
    })

    return image
  }

  async downloadImage(id: string, res: Response) {
    const image = await this.prisma.image.findUnique({ where: { id } })
    if (!image) throw new NotFoundException("Image not found")

    console.log(image)

    const filePath = join(process.cwd(), image.url)

    if (!existsSync(filePath)) {
      throw new NotFoundException("File does not exist on server")
    }

    res.setHeader("Content-Type", image.mimeType)
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${image.filename}"`
    )

    const fileStream = createReadStream(filePath)
    fileStream.pipe(res)
  }
}
