import { ApiProperty } from '@nestjs/swagger';

export class GetNotificationDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userEmail: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  readAt?: Date | null;

  @ApiProperty()
  title: string;

  @ApiProperty()
  message: string;
}
