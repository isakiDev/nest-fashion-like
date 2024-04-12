import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger('main')

  app.enableCors({
    origin: ['http://localhost:5173, https://fashion-like-isakidev.netlify.app']
  })

  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
  const port = process.env.PORT

  await app.listen(port)

  logger.log(`App listen in port ${port}`)
}
bootstrap()
