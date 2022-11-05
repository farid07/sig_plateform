import {getEquipments} from '@/lib/db-admin';
import {formatObjectKeys, logger} from '@/utils/logger';

export const config = {
    api: {
        responseLimit: '20mb',
    },
}

export default async (req, res) => {
    try {
        // const { uid } = await auth.verifyIdToken(req.headers.token);
        const {equipments} = await getEquipments();

        console.log(equipments);

        res.status(200).json({equipments});
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