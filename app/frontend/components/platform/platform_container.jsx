import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { fetchServers } from '../../actions/servers_actions';
import { fetchChannels } from '../../actions/channel_actions';
import { receiveCurrentServerId } from '../../actions/ui_actions';
import Platform from './platform';

const msp = ({ session, entities: { users, servers, channels } }) => {
    let userId;
    // debugger
    if (session.currentUserInfo) {
        userId = session.currentUserInfo.user.id;
    } else {
        userId = null;
    }
    // debugger

    return {
        // currentUser: users[session.id],
        currentUser: session.user,
        currentServer: session.server,
        currentChannel: session.channel,
        servers: servers,
        channels: channels,

    }
};

const mdp = (dispatch, ownProps) => (
    {
        logout: () => dispatch(logout())
            .then(() => ownProps.history.push("/login")),
        fetchServers: () => dispatch(fetchServers()),
        fetchChannels: (serverId) => dispatch(fetchChannels(serverId)),
        receiveCurrentServerId: (serverId, alias) => dispatch(receiveCurrentServerId(serverId, alias))
    }
);

export default connect(msp, mdp)(Platform);