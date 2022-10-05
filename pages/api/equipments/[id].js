import {getEquipment} from '@/lib/db-admin';
import {formatObjectKeys, logger} from '@/utils/logger';

const handler = async (req, res) => {
    if(!req.query?.id) {
        res.status(404).json({});
    }

    try {
        const {equipment} = await getEquipment(req.query?.id);
        res.status(200).json({equipment});
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

export default handler