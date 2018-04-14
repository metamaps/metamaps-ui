import Notifications from './Notifications'
import Search from './Search'
import CreateMap from './CreateMap'
import ImportDialog from './ImportDialog'
import ContextMenu from './ContextMenu'
import ExploreMaps from './ExploreMaps'
import ChatView from './ChatView'
import VideoView from './VideoView'
import InfoBox from './InfoBox'
import Room from './Room'
import TopicCard from './TopicCard'
import SynapseCard from './SynapseCard'

const Views = {
  init: (serverData, store) => {
    ContextMenu.init(serverData, store)
    ExploreMaps.init(serverData, store)
    TopicCard.init(serverData, store)
    SynapseCard.init(serverData, store)
    ChatView.init(serverData, store, [serverData['sounds/MM_sounds.mp3'], serverData['sounds/MM_sounds.ogg']])
    InfoBox.init(serverData, store)
    Notifications.init(serverData, store)
    CreateMap.init(serverData, store)
    ImportDialog.init(serverData, store, GlobalUI.openLightbox, GlobalUI.closeLightbox)
    Search.init(serverData, store)
  },
  ContextMenu,
  ExploreMaps,
  ChatView,
  InfoBox,
  VideoView,
  Room,
  TopicCard,
  SynapseCard,
  Notifications,
  Search,
  CreateMap,
  ImportDialog
}

export {
  ContextMenu,
  ExploreMaps,
  InfoBox,
  ChatView,
  VideoView,
  Room,
  TopicCard,
  SynapseCard,
  Notifications,
  Search,
  CreateMap,
  ImportDialog
}
export default Views
