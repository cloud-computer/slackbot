import { Client, postChat, WELCOME_MESSAGE } from '../../slack';
import { IWebhookInstall } from '../../types';

interface MethodArguments {
  webhook: IWebhookInstall;
}

export async function welcomeUser ({
  webhook,
}: MethodArguments): Promise<any> {

  // auth the client as the bot
  const client = new Client({
    token: webhook.bot.bot_access_token,
    botId: webhook.bot.bot_user_id,
  });

  try {

     // store the following in the db
    /**
     * user token
     * user id
     * bot token
     * bot id
     */

    // get the users projects from stemn -> Api call
    const projects = [{
      name: 'Project 1',
      id: '12345678',
    }, {
      name: 'Project 2',
      id: '987654321',
    }];

    // welcome the user ask the user what project they want to upload too
    const message = WELCOME_MESSAGE({
      projects,
      callbackId: 'attach_project',
    });

    await postChat({
      client,
      channel: webhook.incoming_webhook.channel_id,
      message,
    });

  } catch (e) {
    console.error(e);
  }
}
