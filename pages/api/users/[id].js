import {getUser} from '@/lib/db-admin';
import {formatObjectKeys, logger} from '@/utils/logger';

export default async (req, res) => {
    try {
        const userId = req?.query?.id
        const user = await getUser(userId);
        res.status(200).json({user});
    } catch (error) {
        logger.error(
            {
                request: {
                    headers: formatObjectKeys(req.headers),
                    url: req.url,
                    method: req.method
                },
                response: {
                    statusCode: res.statusCode
                }
            },
            error.message
        );

        res.status(500).json({error});
    }
};