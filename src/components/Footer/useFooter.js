import { FOOTER_PATHS } from "../../constants/paths";
import useQuery from "../../hooks/useQuery";
import { pageService } from "../../services/pageService";


const useFooter = () => {
    const { data: footerData } = useQuery(() =>
      pageService.getPageDataByName("footer")
    );
  
    const info = footerData?.data?.description;
    const hotline = footerData?.data?.hotline;
    const { usefulLink, customerService, myAccount } = footerData?.data || {};
  
    // Useful Links
    const usefulLinkModified = FOOTER_PATHS.find((item) => {
      return item.title === usefulLink?.title;
    });
  
    const usefulLinkTitle = usefulLink?.title || "";
    const usefulLinks = usefulLink?.item?.map((item, index) => {
      return {
        title: item,
        path: usefulLinkModified.path[index],
      };
    });
  
    // Customer service links
    const customerServiceModified = FOOTER_PATHS.find((item) => {
      return item.title === customerService?.title;
    });
    const customerServiceTitle = customerService?.title || "";
    const customerServices =
      customerService?.item?.map((item, index) => ({
        title: item,
        path: customerServiceModified.path[index],
      })) || [];
  
    // My account links
    const myAccountModified = FOOTER_PATHS.find((item) => {
      return item.title === myAccount?.title;
    });
    const myAccountTitle = myAccount?.title || "";
    const myAccounts =
      myAccount?.item?.map((item, index) => ({
        title: item,
        path: myAccountModified.path[index],
      })) || [];
  
    const footerProps = {
      info,
      hotline,
      usefulLinkTitle,
      usefulLinks,
      customerServiceTitle,
      customerServices,
      myAccountTitle,
      myAccounts,
    };
  
    return {
      footerProps,
    };
  };
  
  export default useFooter;