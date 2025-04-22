import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from  './pages/NotFound';
import Privacy from   './pages/Privacy';
import Terms from     './pages/Terms';
import Aboutus from   './pages/Aboutus';



import DashboardC from './pages/DashboardC';


import PricingBasic from './pages/PricingBasic';
import PricingEnterprice from './pages/PricingEnterprice';
import PricingPro from './pages/PricingPro';


import ProtectedRoute from './components/ProtectedRoute';
import Explore from './pages/Explore';
import AnalyticalThesis from './pages/features/Analytic';
import ArgumentativeThesis from './pages/features/Argumental';
import PolicyThesis from './pages/features/Policy';
import HistoricalThesis from './pages/features/History';
import LiteraturePolicyThesis from './pages/features/Literature';
import ThesisEnhancer from './pages/features/Writting';














function App() {
  return (  
    <Routes>
      <Route path="/admin/*" element={<DashboardC />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />

        <Route path="explore" element={<Explore />} />



      
          
        <Route path="pricing" element={<Pricing />} />
        <Route element={<ProtectedRoute />}>
        <Route path="analytical-thesis" element={<AnalyticalThesis />} />
        <Route path="policy-thesis" element={<PolicyThesis />} />
        <Route path="argumentative-thesis" element={<ArgumentativeThesis />} />
        <Route path="historical-thesis" element={<HistoricalThesis />} />
        <Route path="literature-review" element={<LiteraturePolicyThesis />} />
        <Route path="writing-tools" element={<ThesisEnhancer />} />

                          <Route path="pricing/basic" element={<PricingBasic />} />
                          <Route path="pricing/enterprise" element={<PricingEnterprice />} />
                          <Route path="pricing/pro" element={<PricingPro />} />
                  
      
      

      
          
     
          
          


        
        
          
        </Route>
        
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="privacy" element={<Privacy/>} />
        <Route path="terms" element={<Terms/>} />
        <Route path="aboutus" element={<Aboutus/>} />
        
        
        <Route path="*" element={<NotFound />} />
      
      
      


      </Route>
    </Routes>
  );
}

export default App;