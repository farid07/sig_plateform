// import { auth } from '@/lib/firebase-admin';
import {getOperators} from '@/lib/db-admin';
import {formatObjectKeys, logger} from '@/utils/logger';

export default async (req, res) => {
    try {
        // const { uid } = await auth.verifyIdToken(req.headers.token);
        const {operators} = await getOperators();

        res.status(200).json({operators});
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