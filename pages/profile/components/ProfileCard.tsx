import {Card} from 'antd';
import s from './ProfileCard.module.css';
const {Meta} = Card;

const ProfileCard = ({displayName, photoURL}) => {
    return (
        <Card className={s.card} hoverable style={{width: 200}} cover={<img src={photoURL} />}>
            <Meta title={displayName} description="Nick Name" />
        </Card>
    );
};

export default ProfileCard;
