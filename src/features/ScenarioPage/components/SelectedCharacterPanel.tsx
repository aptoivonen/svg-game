import { AnimatePresence, motion } from 'framer-motion'
import { Character } from '@/types'
import { ActionPointIcon } from '@/components'
import clsx from 'clsx'

const DURATION_SECONDS = 0.2

type SelectedCharacterPanelProps = {
  character: Character | null
  className?: React.ComponentProps<'div'>['className']
}

function SelectedCharacterPanel({
  className,
  character
}: SelectedCharacterPanelProps) {
  return (
    <AnimatePresence>
      {!!character && (
        <motion.div
          className={clsx(
            className,
            'z-10 h-[200px] w-[600px] border-2 border-[#8C7856] bg-gradient-to-br from-black to-purple-900 p-4 text-white shadow-2xl shadow-black'
          )}
          initial={{ opacity: 0, y: '100%', x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          transition={{ duration: DURATION_SECONDS }}
          exit={{ opacity: 0, y: '100%', x: '-50%' }}
          key="panel"
        >
          <p>{character.name}</p>
          <div className="flex h-[10px] gap-1">
            {Array.from({ length: character.currentActionPoints }, (_, i) => (
              <ActionPointIcon key={i} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SelectedCharacterPanel
