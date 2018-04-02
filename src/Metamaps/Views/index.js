/* global $ */

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
import { JUNTO_UPDATED } from '../Realtime/events'

const Views = {
  init: (serverData, store) => {
    $(document).on(JUNTO_UPDATED, () => ExploreMaps.render())

    ExploreMaps.init(serverData, store)

    ChatView.init([serverData['sounds/MM_sounds.mp3'], serverData['sounds/MM_sounds.ogg']])
    InfoBox.init(serverData)
    Notifications.init(serverData)
    CreateMap.init(serverData)
    ImportDialog.init(serverData, self.openLightbox, self.closeLightbox)
    Search.init(serverData)
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
