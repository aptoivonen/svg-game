import { AnimatePresence, motion } from 'framer-motion'
import { Character } from '@/types'
import { ActionPointIcon } from '@/components'

const DURATION_SECONDS = 0.2

type SelectedCharacterPanelProps = {
  character: Character | null
}

function SelectedCharacterPanel({ character }: SelectedCharacterPanelProps) {
  return (
    <AnimatePresence>
      {!!character && (
        <motion.div
          className="absolute bottom-0 left-1/2 z-10 h-[200px] w-[600px] border-2 border-[#8C7856] bg-gradient-to-br from-black to-purple-900 p-4 text-white shadow-2xl shadow-black"
          initial={{ opacity: 0, y: '100%', x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          transition={{ duration: DURATION_SECONDS }}
          exit={{ opacity: 0, y: '100%', x: '-50%' }}
          key="panel"
        >
          <p>{character.name}</p>
          <div className="flex h-[10px] gap-1">
            {character.currentActionPoints >= 1 && <ActionPointIcon />}
            {character.currentActionPoints >= 2 && <ActionPointIcon />}
            {character.currentActionPoints >= 3 && <ActionPointIcon />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SelectedCharacterPanel
