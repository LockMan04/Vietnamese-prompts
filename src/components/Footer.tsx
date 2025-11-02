import { BookOpen, Tag, Heart, Github, GitFork, Star, MessageCircle } from 'lucide-react';

interface FooterProps {
  totalPrompts: number;
  totalCategories: number;
}

const Footer = ({ totalPrompts, totalCategories }: FooterProps) => {
  return (
    <footer className="relative mt-20 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-gray-950 dark:via-blue-950 dark:to-purple-950">
      <div className="absolute inset-0 opacity-40" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
      <div className="relative container mx-auto px-4 py-12 text-center">
        {/* Logo and Title */}
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center">
              <img 
                src="/icon.png" 
                alt="Vietnamese Prompts Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div className="absolute -inset-1 rounded-xl opacity-30 blur"></div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">
              Vietnamese Prompts
            </h3>
            <p className="text-blue-200 text-sm">AI Prompts Library</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Thư viện prompts tiếng Việt chất lượng cao dành cho AI và sáng tạo nội dung. 
          Khám phá hàng trăm prompts được thiết kế đặc biệt cho người Việt Nam.
        </p>
        
        {/* Contribution Section */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold text-white mb-4 flex items-center justify-center space-x-2">
            <Github className="w-5 h-5" />
            <span>Đóng góp cho dự án</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <a
              href="https://github.com/LockMan04/Vietnamese-prompts/issues/new?labels=%C4%90%E1%BB%81+xu%E1%BA%A5t+Prompt&template=prompt-suggestion.md&title=%5BPROMPT%5D+"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 group"
              style={{
                background: 'linear-gradient(135deg, rgba(12, 151, 250, 0.2), rgba(22, 225, 245, 0.2))',
                color: '#16e1f5'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(12, 151, 250, 0.3), rgba(22, 225, 245, 0.3))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(12, 151, 250, 0.2), rgba(22, 225, 245, 0.2))';
              }}
            >
              <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm">Đề xuất Prompt</span>
            </a>
            <a
              href="https://github.com/LockMan04/Vietnamese-prompts/fork"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 group"
              style={{
                background: 'linear-gradient(135deg, rgba(12, 151, 250, 0.2), rgba(22, 225, 245, 0.2))',
                color: '#0c97fa'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(12, 151, 250, 0.3), rgba(22, 225, 245, 0.3))';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(12, 151, 250, 0.2), rgba(22, 225, 245, 0.2))';
              }}
            >
              <GitFork className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm">Fork & PR</span>
            </a>
            <a
              href="https://github.com/LockMan04/Vietnamese-prompts"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 group"
            >
              <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm">View GitHub</span>
            </a>
            <a
              href="https://github.com/LockMan04/Vietnamese-prompts/stargazers"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-3 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-200 rounded-lg transition-all duration-200 group"
            >
              <Star className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm">Give Star</span>
            </a>
          </div>
          <p className="text-blue-200 text-sm mt-4 max-w-xl mx-auto">
            Mở source và miễn phí! Hãy góp phần xây dựng thư viện prompts tiếng Việt lớn nhất.
          </p>
          
          {/* How to Contribute */}
          <div className="mt-6">
            <h5 className="text-lg font-medium text-white mb-4 text-center">2 cách đóng góp:</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Easy Way - Issues */}
              <div className="bg-white/5 rounded-lg p-6 border-l-4" style={{borderLeftColor: '#16e1f5'}}>
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: 'rgba(22, 225, 245, 0.2)'}}>
                    <MessageCircle className="w-5 h-5" style={{color: '#16e1f5'}} />
                  </div>
                  <div className="text-left">
                    <h6 className="text-white font-medium mb-1">Cách dễ - GitHub Issues</h6>
                    <p className="text-xs" style={{color: '#16e1f5'}}>Dành cho mọi người</p>
                  </div>
                </div>
                <ul className="text-sm space-y-2 list-disc list-inside text-left" style={{color: '#16e1f5'}}>
                  <li>Click "Đề xuất Prompt"</li>
                  <li>Điền thông tin prompt vào form</li>
                  <li>Submit issue, chúng tôi sẽ thêm vào</li>
                </ul>
              </div>
              
              {/* Advanced Way - Fork */}
              <div className="bg-white/5 rounded-lg p-6 border-l-4" style={{borderLeftColor: '#0c97fa'}}>
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{backgroundColor: 'rgba(12, 151, 250, 0.2)'}}>
                    <GitFork className="w-5 h-5" style={{color: '#0c97fa'}} />
                  </div>
                  <div className="text-left">
                    <h6 className="text-white font-medium mb-1">Cách nâng cao - Fork & PR</h6>
                    <p className="text-xs" style={{color: '#0c97fa'}}>Dành cho developers</p>
                  </div>
                </div>
                <ul className="text-sm space-y-2 list-disc list-inside text-left" style={{color: '#0c97fa'}}>
                  <li>Fork repository</li>
                  <li>Chỉnh sửa prompts.jsonl</li>
                  <li>Tạo Pull Request</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center space-x-8 mb-8">
          <div className="text-center group">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="w-6 h-6 text-blue-300 mr-2 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-white">{totalPrompts}+</div>
            </div>
            <div className="text-blue-200 text-sm">Prompts</div>
          </div>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-blue-400 to-transparent"></div>
          <div className="text-center group">
            <div className="flex items-center justify-center mb-2">
              <Tag className="w-6 h-6 text-blue-300 mr-2 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-white">{totalCategories}+</div>
            </div>
            <div className="text-blue-200 text-sm">Lĩnh vực</div>
          </div>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-blue-400 to-transparent"></div>
          <div className="text-center group">
            <div className="flex items-center justify-center mb-2">
              <Heart className="w-6 h-6 text-blue-300 mr-2 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-white">100%</div>
            </div>
            <div className="text-blue-200 text-sm">Miễn phí</div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-gray-400 text-sm flex items-center justify-center space-x-1">
            <span>© 2025 Vietnamese Prompts. Được phát triển với</span>
            <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
            <span>tại Việt Nam.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;