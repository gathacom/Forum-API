import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Reply from 'App/Models/Reply'
import Thread from 'App/Models/Thread'
import ReplyValidator from 'App/Validators/ReplyValidator'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'

export default class RepliesController {
    public async store({params, auth, response, request}:HttpContextContract){
        try {
            const {content} =  await request.validate(ReplyValidator)
            const thread = await Thread.findOrFail(params.thread_id)

            const reply = await thread.related('replies').create({
                userId : auth.user?.id,
                content,
            })
            await reply.load('user')
            await reply.load('thread')

            return response.status(201).json({
                data : reply,
            })
        } catch (error) {
            return response.status(400).json({
                error : error.message,
            })
        }
    }
    public async update({params, auth, response, request}:HttpContextContract){
        try {
            const user = auth.user
            const reply = await Reply.findOrFail(params.id)
            
            if(user?.id !== reply.userId){
                throw new UnauthorizedException('Unauthorized', 403, 'E_UNAUTHORIZED'); 
            }

            const validateData = await request.validate(ReplyValidator)
            await reply.merge(validateData).save()

            await reply?.load('user')
            return response.status(200).json({
                data : reply,
            })

        } catch (error) {
            if (error.name === 'UnauthorizedException') {
                return response.status(error.status).json({
                    message : error.message
                })
            }else{
                return response.status(404).json({
                    message : 'Reply not found',
                })
            }
        }
    }
    public async destroy({params, auth, response}:HttpContextContract){
        try {
            const user = auth.user
            const reply = await Reply.findOrFail(params.id)

            if(user?.id !== reply.userId){
                throw new UnauthorizedException('Unauthorized', 403, 'E_UNAUTHORIZED');
            }

            await reply.delete()
            return response.status(200).json({
                message : 'Reply deleted successfully'
            })

        } catch (error) {
            if (error.name === 'UnauthorizedException') {
                return response.status(error.status).json({
                    message : error.message
                })
            }else{
                return response.status(404).json({
                    message : 'Reply not found',
                })
            }
        }
    }


}
