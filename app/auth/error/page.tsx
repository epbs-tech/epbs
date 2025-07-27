import { CardWrapper } from "@/app/components/auth/card-wrapper";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";

const AuthErrorPage = () => {
  return(
      <CardWrapper
            headerLabel="Oops! Something went wrong"
            backButtonLabel="Back to Login"
            backButtonHref="/auth/login"
        >
          <div className="w-full items-center flex justify-center">
              <ExclamationTriangleIcon className="text-destructive"/>
          </div>
      </CardWrapper>
  )
};
export default AuthErrorPage;