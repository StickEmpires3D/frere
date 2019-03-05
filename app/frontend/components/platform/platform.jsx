import React from 'react';
import ServersContainer from './servers/servers_container';
import ChannelsContainer from './channels/channels_container';

class Platform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {homeId: null};
        // debugger
    }

    componentDidMount() {
        // fetch all servers
        // fetch all channels for first server
        // fetch all messages for first channel
        const currentUserId = this.props.currentUser.id;
        const currentPath = this.props.location.pathname.slice(10);
        // debugger
        this.props.fetchServers()
            .then((servers) => {
                let serversArray = Object.values(servers.servers);
                if (currentPath === "@me") {
                    serversArray = serversArray.filter((server) => server.server_name === `${currentUserId}_@me_home`);
                } else {
                    serversArray = serversArray.filter((server) => server.id === parseInt(currentPath));
                }
                
                const homeServer = serversArray[0];
                this.state.homeId = homeServer.id;
                this.props.fetchChannels(homeServer.id)});
    }

    render() {
        // debugger
        return (
            <div className="pf_platformWrapper">
                <div className="pf_serversWrapper">
                    <ServersContainer />
                </div>

                <div className="pf_channelsWrapper">
                    {/* RENDER CHANNELS CONTAINER HERE */}
                    <ChannelsContainer />
                </div>
            </div>
        )
    }
}

export default Platform