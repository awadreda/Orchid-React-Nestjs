import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import React, { useState, type ChangeEvent, type FormEvent } from 'react'
import Mammoth from 'mammoth'
import { FaTheRedYeti } from 'react-icons/fa'

// يمكنك جلب هذه الواجهة من ملف Typescript الخاص بك
export interface CreateStoryDto {
  title: string
  content?: string
  caption?: string
  thumbnailUrl?: string
  published?: boolean
  authorId?: number
}

// قائمة وهمية للمؤلفين لاستخدامها في Select Box
const mockAuthors = [
  { id: 1, name: 'أحمد' },
  { id: 2, name: 'فاطمة' },
  { id: 3, name: 'خالد' }
]

// **********************************************
// الأنماط الثابتة (Styles)
// **********************************************

const styles = {
  // النمط العام للخلفية الداكنة للجسم
  body: {
    backgroundColor: '#0a0a0a',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    direction: 'rtl' as const, // دعم اللغة العربية
    color: '#E0E0E0'
  },

  // النمط الرئيسي للحاوية الزجاجية (Glassmorphism Effect)
  formContainer: {
    padding: '30px',
    maxWidth: '500px',
    width: '90%',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.05)', // خلفية شفافة قليلاً
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)', // ظل خفيف
    backdropFilter: 'blur(10px)', // التأثير الزجاجي الأساسي
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'right' as const
  },

  // أنماط حقول الإدخال والاختيار (Input/Select/Textarea)
  inputField: {
    width: '100%',
    padding: '12px 15px',
    margin: '8px 0 15px 0',
    borderRadius: '10px',
    border: '1px solid #444',
    backgroundColor: '#1E1E1E',
    color: '#E0E0E0',
    outline: 'none',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.3s'
  },

  // النمط الخاص بالزر المتدرج النيون
  submitButton: {
    width: '100%',
    padding: '15px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '25px',
    fontWeight: 'bold' as const,
    fontSize: '1.1rem',
    background: 'linear-gradient(45deg, #00C4FF, #924FEF)', // تدرج نيون أزرق/بنفسجي
    color: 'white',
    boxShadow: '0 5px 15px rgba(146, 79, 239, 0.4)',
    transition: 'transform 0.2s'
  },

  // نمط الزر الصغير لرفع الملفات
  fileButton: {
    padding: '10px 15px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#333',
    color: 'white',
    fontWeight: 'normal' as const,
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  },

  // نمط الحقل الزائف لرفع الملف
  fileInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '5px'
  }
}

// **********************************************
// المكون الرئيسي
// **********************************************

export default function AddNewStoryPage () {
  const [storyData, setStoryData] = useState<CreateStoryDto>({
    title: '',
    content: '',
    caption: '',
    thumbnailUrl: '',
    published: false,
    authorId: undefined
  })

  const dispatch = useAppDispatch()

  const storyApi = useAppSelector(state => state.story)
  // const userApi = useAppSelector(state => state.user)
  const currentStory = storyApi.CurrentStory

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)

  // 1. تحديث منطق handleChange ليشمل الـ checkbox بشكل صحيح
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target

    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      const target = e.target as HTMLInputElement

      setStoryData(prev => ({
        ...prev,
        [name]: target.checked // تم تصحيح هذا السطر
      }))
    } else {
      setStoryData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  // 2. معالجة رفع ملف المحتوى (Markdown/TXT)
  const handleContentFileUpload =async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      console.log('No file selected')
      return
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase()

    if (fileExtension === 'txt' || fileExtension === 'md') {
      const reader = new FileReader()
      reader.onload = event => {
        setStoryData(prev => ({
          ...prev,
          content: event.target?.result as string
        }))
      }
      reader.readAsText(file);
    }
    else if (fileExtension === 'docx') {
    
      const reader = new FileReader()
      reader.onload = event => {
      
        if(!event.target?.result) return


        try{

        
        
            
            const result =   await Mammoth.convertToHtml({ arrayBuffer: event.target.result as ArrayBuffer })
            
            setStoryData(prev => ({
              ...prev,
              content: result.value // النص المحول إلى HTML
            }))
            
            
          }
          catch(err) {
            console.error('خطأ في تحويل ملف DOCX:', err)
          }
        }
      }
      
        setStoryData(prev => ({
          ...prev,
          content: ''
        }))
    
    }

  

   
  }

  // 3. معالجة رفع ملف الصورة المصغرة (Thumbnail File)
  const handleThumbnailFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnailFile(file)
      setStoryData(prev => ({
        ...prev,
        thumbnailUrl: ''
      }))
    }
  }

  // 4. معالجة إرسال النموذج (لم يتم تغييره)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let finalStoryData: CreateStoryDto = { ...storyData }

    if (thumbnailFile) {
      console.log('سيتم رفع هذا الملف:', thumbnailFile.name)
      // محاكاة لـ URL
      finalStoryData.thumbnailUrl = `uploaded-temp-url/${thumbnailFile.name}`
    }

    finalStoryData.authorId = finalStoryData.authorId
      ? parseInt(finalStoryData.authorId as any)
      : undefined

    console.log('البيانات النهائية للإرسال:', finalStoryData)
    // منطق إرسال البيانات (finalStoryData) إلى API
    alert('تم إرسال البيانات (تحقق من الـ Console)')
  }

  // مكون فرعي لزر الرفع المخفي وتنسيق الزر المرئي
  const FileUploadButton = ({
    label,
    accept,
    onChange,
    contentInfo
  }: {
    label: string
    accept: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    contentInfo: string | null
  }) => (
    <div style={{ marginBottom: '15px' }}>
      <label
        style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: '0.9rem',
          color: '#B0B0B0'
        }}
      >
        {label}
      </label>
      <div style={styles.fileInputWrapper}>
        <input
          type='file'
          accept={accept}
          onChange={onChange}
          style={{ display: 'none' }} // إخفاء حقل الإدخال الأصلي
          id={`file-upload-${accept.replace(/[^a-z]/g, '')}`}
        />
        <label
          htmlFor={`file-upload-${accept.replace(/[^a-z]/g, '')}`}
          style={styles.fileButton}
        >
          {/* أيقونة رفع (يمكن استبدالها برمز حقيقي) */}
          <span role='img' aria-label='upload'>
            📤
          </span>
          رفع ملف
        </label>
        {contentInfo && (
          <span
            style={{
              fontSize: '0.85rem',
              color: contentInfo.includes('تم تحميل') ? '#00FFC4' : '#E0E0E0'
            }}
          >
            {contentInfo}
          </span>
        )}
      </div>
    </div>
  )

  return (
    <div style={styles.body}>
      <div style={styles.formContainer}>
        <h2
          style={{
            textAlign: 'center',
            color: '#00C4FF',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '15px',
            marginBottom: '25px'
          }}
        >
          إضافة قصة جديدة{' '}
          <span style={{ fontSize: '1.2rem', color: '#E0E0E0' }}>
            | Add New Story
          </span>
        </h2>

        <form onSubmit={handleSubmit}>
          {/* حقل العنوان (Title) */}
          <label style={{ display: 'block' }}>
            <span style={{ fontSize: '0.9rem', color: '#B0B0B0' }}>
              العنوان (Title)
            </span>
            <input
              type='text'
              name='title'
              value={storyData.title}
              onChange={handleChange}
              required
              style={styles.inputField}
              placeholder='أدخل عنوان القصة هنا...'
            />
          </label>

          {/* حقل الوصف (Caption) */}
          <label style={{ display: 'block' }}>
            <span style={{ fontSize: '0.9rem', color: '#B0B0B0' }}>
              الوصف (Caption)
            </span>
            <textarea
              name='caption'
              value={storyData.caption}
              onChange={handleChange}
              rows={3}
              style={{ ...styles.inputField, resize: 'none' }}
              placeholder='وصف مختصر للقصة...'
            />
          </label>

          {/* اختيار المؤلف */}
          <label style={{ display: 'block' }}>
            <span style={{ fontSize: '0.9rem', color: '#B0B0B0' }}>
              المؤلف (Author)
            </span>
            <select
              name='authorId'
              value={storyData.authorId || ''}
              onChange={handleChange}
              required
              style={styles.inputField}
            >
              <option value='' disabled>
                اختر مؤلفاً...
              </option>
              {mockAuthors.map(author => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </label>

          {/* رفع ملف المحتوى (Markdown/TXT) */}
          <FileUploadButton
            label='ملف المحتوى (Markdown/TXT):'
            accept='.md,.txt,.docx'
            onChange={handleContentFileUpload}
            contentInfo={
              storyData.content
                ? `✅ تم تحميل محتوى بطول: ${storyData.content.length} حرف`
                : null
            }
          />

          {/* خيارات الصورة المصغرة (Thumbnail) */}
          <fieldset
            style={{
              border: '1px dashed #444',
              padding: '15px',
              margin: '20px 0',
              borderRadius: '12px'
            }}
          >
            <legend
              style={{
                color: '#00C4FF',
                padding: '0 10px',
                fontWeight: 'bold'
              }}
            >
              الصورة المصغرة (Thumbnail)
            </legend>

            {/* رفع ملف صورة */}
            <FileUploadButton
              label='1. رفع ملف صورة (JPG/PNG):'
              accept='image/*'
              onChange={handleThumbnailFileChange}
              contentInfo={
                thumbnailFile ? `🖼️ ملف محدد: ${thumbnailFile.name}` : null
              }
            />

            <p style={{ textAlign: 'center', margin: '15px 0', color: '#888' }}>
              — أو أدخل رابطاً مباشراً —
            </p>

            {/* رابط صورة */}
            <label style={{ display: 'block' }}>
              <span style={{ fontSize: '0.9rem', color: '#B0B0B0' }}>
                2. رابط صورة خارجي (URL)
              </span>
              <input
                type='url'
                name='thumbnailUrl'
                value={storyData.thumbnailUrl}
                onChange={handleChange}
                onFocus={() => setThumbnailFile(null)} // إزالة الملف المرفوع عند بدء إدخال URL
                style={styles.inputField}
                placeholder='https://example.com/image.jpg'
              />
            </label>
          </fieldset>

          {/* نشر/مسودة (Toggle Switch - سنستخدم Checkbox بسيط لتبسيط الكود) */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '20px 0 30px 0'
            }}
          >
            <span style={{ fontSize: '1rem', color: '#E0E0E0' }}>
              نشر القصة الآن؟ (Published)
            </span>
            <input
              type='checkbox'
              name='published'
              checked={storyData.published}
              onChange={handleChange}
              // يمكنك تطبيق أنماط لـ Toggle Switch مع مكتبات CSS مثل Tailwind أو مكونات مخصصة
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                accentColor: '#00C4FF' // لون الـ Checkbox في بعض المتصفحات
              }}
            />
          </div>

          {/* زر الإرسال (Submit Button) */}
          <button type='submit' style={styles.submitButton}>
            إنشاء القصة{' '}
            <span role='img' aria-label='rocket'>
              🚀
            </span>
          </button>
        </form>
      </div>
    </div>
  )
}
