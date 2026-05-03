import {
  Server,
  Lock,
  Code,
  Database,
  GitBranchIcon,
  ExternalLink,
  MessageSquare,
  Users,
  CheckCircle,
  type LucideProps,
} from "lucide-react";

export const ServerIcon = (props: LucideProps) => <Server {...props} />;
export const LockIcon = (props: LucideProps) => <Lock {...props} />;
export const CodeIcon = (props: LucideProps) => <Code {...props} />;
export const DatabaseIcon = (props: LucideProps) => <Database {...props} />;
export const GitBranchIconIcon = (props: LucideProps) => (
  <GitBranchIcon {...props} />
);
export const ExternalLinkIcon = (props: LucideProps) => (
  <ExternalLink {...props} />
);
export const MessageSquareIcon = (props: LucideProps) => (
  <MessageSquare {...props} />
);
export const UsersIcon = (props: LucideProps) => <Users {...props} />;
export const CheckCircleIcon = (props: LucideProps) => (
  <CheckCircle {...props} />
);

const icons = {
  ServerIcon,
  LockIcon,
  CodeIcon,
  DatabaseIcon,
  GitBranchIconIcon,
  ExternalLinkIcon,
  MessageSquareIcon,
  UsersIcon,
  CheckCircleIcon,
};

export default icons;
