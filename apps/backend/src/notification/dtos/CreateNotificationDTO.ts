import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDTO {
  @ApiProperty()
  userEmail: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  message: string;
}
