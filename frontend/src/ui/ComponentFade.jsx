import { motion } from "framer-motion";

export const ComponentFade = ({ children, duration = 0.5, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
