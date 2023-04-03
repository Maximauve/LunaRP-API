import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CharacterModule } from './character/character.module';
import { ItemModule } from './item/item.module';
import { SpellModule } from './spell/spell.module';
import { ClasseModule } from './class/class.module';
import { CampaignModule } from './campaign/campaign.module';
import { RaceModule } from './race/race.module';
import { LanguageModule } from './language/language.module';
import { CharacterItemModule } from './characterItem/characterItem.module';
import { LocalFileModule } from './localFile/localFile.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			useFactory: () => ({
				type: 'mysql',
				host: process.env.DB_HOST,
				port: parseInt(process.env.DB_PORT),
				username: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_NAME,
				entities: [__dirname + '/**/*.entity{.ts,.js}'],
				synchronize: true,
				autoLoadEntities: true,
			}),
		}),
		UsersModule,
		CharacterModule,
		ItemModule,
		SpellModule,
		ClasseModule,
		CampaignModule,
		RaceModule,
		LanguageModule,
		CharacterItemModule,
		LocalFileModule
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
